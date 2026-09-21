import { useDemo } from "../../state/DemoStore";

export function AssistDrawer() {
  const { assistOpen, setAssistOpen, selected, chat, askChip, openSource } = useDemo();
  if (!assistOpen) return null;

  return (
    <aside className="drawer" aria-label="追加の確認">
      <header>
        <div>
          <p className="detail-kicker">この問い合わせについて</p>
          <h3>追加で確認する</h3>
        </div>
        <button type="button" className="btn ghost" onClick={() => setAssistOpen(false)}>
          閉じる
        </button>
      </header>
      <p className="drawer-lead">
        返す内容は担当者が決めます。知りたいことだけ確認してください。
      </p>
      <div className="chips">
        {selected.chips.map((chip) => (
          <button key={chip.id} type="button" onClick={() => askChip(selected, chip.id)}>
            {chip.label}
          </button>
        ))}
      </div>
      <div className="chat">
        {chat.length === 0 ? (
          <p className="chat-empty">
            上の項目から確認できます。このデモでは、この問い合わせ以外の質問には答えません。
          </p>
        ) : (
          chat.map((turn, i) => (
            <div key={`${turn.role}-${i}`} className={`bubble is-${turn.role}`}>
              <p>{turn.text}</p>
              {turn.sourceId ? (
                <button type="button" className="btn ghost" onClick={() => openSource(turn.sourceId!)}>
                  根拠を開く
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
