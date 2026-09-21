import { CATALOG_ROWS, INVENTORY_ROWS, RATE_ROWS, type SourceId } from "../../content/inquiries";
import { useDemo } from "../../state/DemoStore";

const TITLE: Record<SourceId, string> = {
  inventory: "在庫表",
  catalog: "型番マスタ",
  rate: "掛率表",
};

function mentionsSku(haystack: string, sku: string) {
  return haystack.split(/[^A-Za-z0-9-]+/).includes(sku);
}

export function SourceModal() {
  const { source, closeSource, selected } = useDemo();
  if (!source) return null;

  const wanted = `${selected.subject} ${selected.mail} ${selected.resultItems.map((row) => row.value).join(" ")}`;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="source-title">
      <button type="button" className="modal-bg" aria-label="閉じる" onClick={closeSource} />
      <div className="modal-card">
        <header>
          <div>
            <p className="detail-kicker">確認に使う社内情報</p>
            <h3 id="source-title">{TITLE[source]}</h3>
          </div>
          <button type="button" className="btn ghost" onClick={closeSource}>
            閉じる
          </button>
        </header>
        <p className="modal-lead">
          下書きの数字と、この表の該当行が同じかを見てから返してください。
        </p>
        {source === "inventory" ? (
          <table>
            <thead>
              <tr>
                <th>型番</th>
                <th>品名</th>
                <th>倉庫</th>
                <th>在庫</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_ROWS.map((row) => {
                const hit = mentionsSku(wanted, row.sku);
                return (
                  <tr key={row.sku} className={hit ? "is-hit" : undefined}>
                    <td>{row.sku}</td>
                    <td>{row.name}</td>
                    <td>{row.warehouse}</td>
                    <td>{row.qty}</td>
                    <td>{row.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {source === "catalog" ? (
          <table>
            <thead>
              <tr>
                <th>型番</th>
                <th>品名</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {CATALOG_ROWS.map((row) => {
                const hit = mentionsSku(wanted, row.sku);
                return (
                  <tr key={row.sku} className={hit ? "is-hit" : undefined}>
                    <td>{row.sku}</td>
                    <td>{row.name}</td>
                    <td>{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {source === "rate" ? (
          <table>
            <thead>
              <tr>
                <th>得意先</th>
                <th>掛け率</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {RATE_ROWS.map((row) => (
                <tr key={row.customer} className={row.customer === selected.customer ? "is-hit" : undefined}>
                  <td>{row.customer}</td>
                  <td>{row.rate}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
