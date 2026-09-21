import { INQUIRIES } from "../../content/inquiries";
import { useDemo } from "../../state/DemoStore";

export function InquiryList() {
  const { selectedId, select, statusOf } = useDemo();

  return (
    <section className="list" aria-label="問い合わせ一覧">
      <header className="list-hd">
        <h2>今日の問い合わせ</h2>
        <p>開くと、確認結果と返信下書きが並びます。</p>
      </header>
      <ul>
        {INQUIRIES.map((item) => {
          const status = statusOf(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                className={selectedId === item.id ? "is-on" : undefined}
                onClick={() => select(item.id)}
              >
                <span className="list-top">
                  <strong>{item.customer}</strong>
                  <time>{item.time}</time>
                </span>
                <span className="list-sub">{item.subject}</span>
                <span className="list-meta">
                  <em className={`pill${status === "replied" ? " is-ok" : item.needsCheck ? " is-warn" : ""}`}>
                    {status === "replied" ? "返信済み" : item.needsCheck ? "要確認" : "未返信"}
                  </em>
                  <span>{item.type}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
