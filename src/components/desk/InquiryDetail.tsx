import { useState } from "react";
import { useDemo } from "../../state/DemoStore";

export function InquiryDetail() {
  const {
    selected,
    statusOf,
    draftOf,
    setDraft,
    seenOf,
    openSource,
    setAssistOpen,
    askChip,
    reply,
  } = useDemo();
  const [mailOpen, setMailOpen] = useState(false);

  const status = statusOf(selected.id);
  const draft = draftOf(selected.id);
  const seen = seenOf(selected.id);
  const replied = status === "replied";
  const original = selected.draft !== draft;

  return (
    <article className="detail">
      <header className="detail-hd">
        <div>
          <p className="detail-kicker">
            {selected.type}　{selected.customer}　{selected.contact}
          </p>
          <h2>{selected.subject}</h2>
        </div>
        <em className={`pill${replied ? " is-ok" : " is-warn"}`}>
          {replied ? "返信済み" : "確認してから返す"}
        </em>
      </header>

      <section className="panel">
        <div className="panel-hd">
          <h3>届いたメール</h3>
          <button type="button" className="mail-toggle" onClick={() => setMailOpen((v) => !v)}>
            {mailOpen ? "閉じる" : "本文を見る"}
          </button>
        </div>
        <pre className={`mail${mailOpen ? " is-open" : ""}`}>{selected.mail}</pre>
      </section>

      <section className="panel is-result">
        <div className="panel-hd">
          <h3>確認結果</h3>
          <span className="pc-only">担当者が数字を見てから返します</span>
        </div>
        <dl className="facts">
          {selected.resultItems.map((row) => (
            <div key={row.label} className={row.warn ? "is-warn" : undefined}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="result-note pc-only">{selected.resultNote}</p>
        <div className="source-row">
          {selected.sources.map((src) => (
            <button key={src.id} type="button" className="btn ghost" onClick={() => openSource(src.id)}>
              {src.label}
              {seen.includes(src.id) ? "（確認済み）" : ""}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-hd">
          <h3>返信下書き</h3>
          <span>{original ? "編集あり" : "下書きのまま返せます"}</span>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={8}
          disabled={replied}
          aria-label="返信下書き"
        />
        <div className="detail-actions">
          <button type="button" className="btn ghost" onClick={() => setAssistOpen(true)}>
            追加で確認する
          </button>
          {selected.chips.slice(0, 2).map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="btn ghost pc-only"
              onClick={() => askChip(selected, chip.id)}
            >
              {chip.label}
            </button>
          ))}
          <button type="button" className="btn" onClick={reply} disabled={replied}>
            {replied ? "確定済み" : original ? "直した内容で返す" : "下書きのまま返す"}
          </button>
        </div>
      </section>
    </article>
  );
}
