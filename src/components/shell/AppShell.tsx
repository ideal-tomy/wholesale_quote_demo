import { COMPANY, STAFF, STAFF_ROLE, TODAY, type PageId } from "../../content/inquiries";
import { useDemo } from "../../state/DemoStore";

const NAV: { id: PageId; label: string }[] = [
  { id: "inbox", label: "問い合わせ" },
  { id: "stock", label: "在庫" },
  { id: "customers", label: "得意先" },
  { id: "quotes", label: "見積" },
  { id: "settings", label: "設定" },
];

type Props = {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
};

export function AppShell({ sidebarOpen, onCloseSidebar }: Props) {
  const { page, setPage, openCount, returnUrl } = useDemo();

  return (
    <aside className={`side${sidebarOpen ? " is-open" : ""}`} aria-label="メニュー">
      <div className="side-brand">
        <span className="side-mark" aria-hidden="true">
          青
        </span>
        <div>
          <strong>{COMPANY}</strong>
          <small>問い合わせ机</small>
        </div>
      </div>
      <nav className="side-nav">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={page === item.id ? "is-on" : undefined}
            onClick={() => {
              setPage(item.id);
              onCloseSidebar();
            }}
          >
            <span>{item.label}</span>
            {item.id === "inbox" && openCount > 0 ? <em>{openCount}</em> : null}
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <div className="side-user">
          <span className="side-avatar" aria-hidden="true">
            佐
          </span>
          <div>
            <strong>{STAFF}</strong>
            <small>{STAFF_ROLE}　{TODAY}</small>
          </div>
        </div>
        {returnUrl ? (
          <div className="side-links">
            <a href={returnUrl}>← 紹介へ</a>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
