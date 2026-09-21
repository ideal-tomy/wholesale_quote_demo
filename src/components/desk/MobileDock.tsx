import { useDemo } from "../../state/DemoStore";

export function MobileDock() {
  const { page, selected, statusOf, draftOf, openSource, setAssistOpen, reply } = useDemo();
  if (page !== "inbox") return null;

  const replied = statusOf(selected.id) === "replied";
  const original = selected.draft !== draftOf(selected.id);
  const primary = selected.sources[0];

  return (
    <div className="dock">
      <button type="button" className="btn ghost" onClick={() => setAssistOpen(true)}>
        確認する
      </button>
      {primary ? (
        <button type="button" className="btn ghost" onClick={() => openSource(primary.id)}>
          {primary.label.replace("を開く", "")}
        </button>
      ) : null}
      <button type="button" className="btn" onClick={reply} disabled={replied}>
        {replied ? "確定済み" : original ? "直して返す" : "返す"}
      </button>
    </div>
  );
}
