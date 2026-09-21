import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  INQUIRIES,
  type Inquiry,
  type InquiryStatus,
  type PageId,
  type SourceId,
} from "../content/inquiries";
import { selectionReturnUrl, syncSelectionEntry } from "../lib/selectionReturn";

type ChatTurn = { role: "user" | "assist"; text: string; sourceId?: SourceId };

type InquiryState = {
  status: InquiryStatus;
  draft: string;
  seen: SourceId[];
};

type Store = {
  page: PageId;
  setPage: (page: PageId) => void;
  selectedId: string;
  select: (id: string) => void;
  selected: Inquiry;
  statusOf: (id: string) => InquiryStatus;
  draftOf: (id: string) => string;
  setDraft: (value: string) => void;
  seenOf: (id: string) => SourceId[];
  openSource: (id: SourceId) => void;
  source: SourceId | null;
  closeSource: () => void;
  assistOpen: boolean;
  setAssistOpen: (open: boolean) => void;
  chat: ChatTurn[];
  askChip: (inquiry: Inquiry, chipId: string) => void;
  reply: () => void;
  toast: string | null;
  clearToast: () => void;
  openCount: number;
  checkCount: number;
  repliedCount: number;
  returnUrl: string | null;
};

const Ctx = createContext<Store | null>(null);

function initialStates(): Record<string, InquiryState> {
  const next: Record<string, InquiryState> = {};
  for (const item of INQUIRIES) {
    next[item.id] = {
      status: item.id === "q4" ? "replied" : "open",
      draft: item.draft,
      seen: [],
    };
  }
  return next;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>("inbox");
  const [selectedId, setSelectedId] = useState("q1");
  const [states, setStates] = useState(initialStates);
  const [source, setSource] = useState<SourceId | null>(null);
  const [assistOpen, setAssistOpen] = useState(false);
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [returnUrl, setReturnUrl] = useState<string | null>(null);

  useEffect(() => {
    syncSelectionEntry();
    setReturnUrl(selectionReturnUrl());
  }, []);

  const selected = useMemo(
    () => INQUIRIES.find((item) => item.id === selectedId) ?? INQUIRIES[0],
    [selectedId],
  );

  const select = useCallback((id: string) => {
    setSelectedId(id);
    setPage("inbox");
    setChat([]);
    setSource(null);
  }, []);

  const statusOf = useCallback(
    (id: string) => states[id]?.status ?? "open",
    [states],
  );
  const draftOf = useCallback(
    (id: string) => states[id]?.draft ?? "",
    [states],
  );
  const seenOf = useCallback(
    (id: string) => states[id]?.seen ?? [],
    [states],
  );

  const setDraft = useCallback((value: string) => {
    setStates((prev) => ({
      ...prev,
      [selectedId]: { ...prev[selectedId], draft: value },
    }));
  }, [selectedId]);

  const openSource = useCallback((id: SourceId) => {
    setSource(id);
    setStates((prev) => {
      const cur = prev[selectedId];
      if (cur.seen.includes(id)) return prev;
      return {
        ...prev,
        [selectedId]: { ...cur, seen: [...cur.seen, id] },
      };
    });
  }, [selectedId]);

  const askChip = useCallback((inquiry: Inquiry, chipId: string) => {
    const chip = inquiry.chips.find((item) => item.id === chipId);
    if (!chip) return;
    setAssistOpen(true);
    setChat((prev) => [
      ...prev,
      { role: "user", text: chip.label },
      { role: "assist", text: chip.answer, sourceId: chip.sourceId },
    ]);
  }, []);

  const reply = useCallback(() => {
    setStates((prev) => ({
      ...prev,
      [selectedId]: { ...prev[selectedId], status: "replied" },
    }));
    setToast("返信の下書きを確定しました。このデモでは送信しません。");
  }, [selectedId]);

  const openCount = INQUIRIES.filter((item) => statusOf(item.id) === "open").length;
  const checkCount = INQUIRIES.filter(
    (item) => item.needsCheck && statusOf(item.id) === "open",
  ).length;
  const repliedCount = INQUIRIES.filter((item) => statusOf(item.id) === "replied").length;

  const value: Store = {
    page,
    setPage,
    selectedId,
    select,
    selected,
    statusOf,
    draftOf,
    setDraft,
    seenOf,
    openSource,
    source,
    closeSource: () => setSource(null),
    assistOpen,
    setAssistOpen,
    chat,
    askChip,
    reply,
    toast,
    clearToast: () => setToast(null),
    openCount,
    checkCount,
    repliedCount,
    returnUrl,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemo outside provider");
  return ctx;
}
