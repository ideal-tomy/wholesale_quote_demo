import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/shell/AppShell";
import { AssistDrawer } from "../components/desk/AssistDrawer";
import { InquiryDetail } from "../components/desk/InquiryDetail";
import { InquiryList } from "../components/desk/InquiryList";
import { KpiStrip } from "../components/desk/KpiStrip";
import { MobileDock } from "../components/desk/MobileDock";
import { CustomersPage, QuotesPage, SettingsPage, StockPage } from "../components/desk/RefPages";
import { SourceModal } from "../components/desk/SourceModal";
import { DemoProvider, useDemo } from "../state/DemoStore";

function DeskInner() {
  const { page, openCount, checkCount, repliedCount, toast, clearToast, setAssistOpen, assistOpen } = useDemo();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 4200);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  return (
    <div className={`app${menu ? " is-menu" : ""}`}>
      <AppShell sidebarOpen={menu} onCloseSidebar={() => setMenu(false)} />
      {menu ? <button type="button" className="scrim" aria-label="メニューを閉じる" onClick={() => setMenu(false)} /> : null}
      <div className="main">
        <header className="top">
          <button type="button" className="menu-btn" onClick={() => setMenu(true)}>
            メニュー
          </button>
          <div className="top-main">
            <h1>今日の問い合わせ</h1>
            <p className="pc-only">確認結果と返信下書きが並んでいます。根拠の表を見てから返してください。</p>
            <p className="count-badge">未返信 {openCount}</p>
            <Link className="lp-entry" to="/lp">
              詳しい説明
            </Link>
          </div>
          <button type="button" className="btn ghost top-assist" onClick={() => setAssistOpen(true)}>
            確認する
          </button>
        </header>
        {page === "inbox" ? (
          <>
            <KpiStrip open={openCount} check={checkCount} replied={repliedCount} />
            <div className="desk">
              <InquiryList />
              <InquiryDetail />
              <AssistDrawer />
            </div>
          </>
        ) : null}
        {page === "stock" ? <StockPage /> : null}
        {page === "customers" ? <CustomersPage /> : null}
        {page === "quotes" ? <QuotesPage /> : null}
        {page === "settings" ? <SettingsPage /> : null}
      </div>
      {assistOpen ? (
        <button type="button" className="drawer-scrim" aria-label="確認を閉じる" onClick={() => setAssistOpen(false)} />
      ) : null}
      <MobileDock />
      <SourceModal />
      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

export function DeskApp() {
  return (
    <DemoProvider>
      <DeskInner />
    </DemoProvider>
  );
}
