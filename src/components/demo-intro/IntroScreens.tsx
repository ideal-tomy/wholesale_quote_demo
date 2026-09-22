import { memo, useEffect, type ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { InquiryDetail } from "../desk/InquiryDetail";
import { InquiryList } from "../desk/InquiryList";
import { KpiStrip } from "../desk/KpiStrip";
import { SourceModal } from "../desk/SourceModal";
import { DemoProvider, useDemo } from "../../state/DemoStore";
import type { DeviceId } from "./story";

function frameClass(id: DeviceId, stars: readonly DeviceId[]) {
  return `ki-device ki-monitor ki-${id}${stars.includes(id) ? " ki-active" : " ki-idle"}`;
}

function Monitor({
  id,
  tab,
  stars,
  children,
}: {
  id: DeviceId;
  tab: string;
  stars: readonly DeviceId[];
  children: ReactNode;
}) {
  return (
    <div className={frameClass(id, stars)}>
      <div className="ki-device-bar">
        青葉電材 <span>{tab}</span>
      </div>
      <div className="ki-monitor-body">{children}</div>
    </div>
  );
}

function IntroSeed({ sourceOpen, replied }: { sourceOpen: boolean; replied: boolean }) {
  const { openSource, closeSource, reply, source, statusOf, selectedId } = useDemo();
  useEffect(() => {
    if (sourceOpen && source !== "inventory") openSource("inventory");
    if (!sourceOpen && source) closeSource();
  }, [sourceOpen, source, openSource, closeSource]);
  useEffect(() => {
    if (!sourceOpen) return;
    const t = window.setTimeout(() => {
      const row = document.querySelector(".ki-desk tr.is-hit") as HTMLElement | null;
      const card = document.querySelector(".ki-desk .modal-card") as HTMLElement | null;
      if (row && card) card.scrollTop = Math.max(0, row.offsetTop - 72);
    }, 40);
    return () => window.clearTimeout(t);
  }, [sourceOpen]);
  useEffect(() => {
    if (replied && statusOf(selectedId) !== "replied") reply();
  }, [replied, selectedId, statusOf, reply]);
  return null;
}

function Seeded({
  sourceOpen,
  replied,
  children,
}: {
  sourceOpen: boolean;
  replied: boolean;
  children: ReactNode;
}) {
  return (
    <MemoryRouter>
      <DemoProvider key={replied ? "replied" : "open"}>
        <IntroSeed sourceOpen={sourceOpen} replied={replied} />
        {children}
      </DemoProvider>
    </MemoryRouter>
  );
}

function ListScreen() {
  const { openCount, checkCount, repliedCount } = useDemo();
  return (
    <div className="wq-scale">
      <KpiStrip open={openCount} check={checkCount} replied={repliedCount} />
      <InquiryList />
    </div>
  );
}

function DeskScreen() {
  return (
    <div className="wq-scale wq-desk-scale">
      <InquiryDetail />
      <SourceModal />
    </div>
  );
}

export const IntroScreens = memo(function IntroScreens({
  phase,
  stars,
}: {
  phase: number;
  stars: readonly DeviceId[];
}) {
  const sourceOpen = phase === 3;
  const replied = phase >= 4;
  return (
    <>
      <Monitor id="list" tab="今日の問い合わせ" stars={stars}>
        <Seeded sourceOpen={false} replied={false}>
          <ListScreen />
        </Seeded>
      </Monitor>
      <Monitor id="desk" tab="返信" stars={stars}>
        <Seeded sourceOpen={sourceOpen} replied={replied}>
          <DeskScreen />
        </Seeded>
      </Monitor>
    </>
  );
});
