import { CUSTOMERS, INVENTORY_ROWS, QUOTE_ROWS, RATE_ROWS } from "../../content/inquiries";
import { useDemo } from "../../state/DemoStore";

function Banner() {
  const { setPage } = useDemo();
  return (
    <p className="ref-banner">
      このデモの体験は「問い合わせ」から進めます。
      <button type="button" onClick={() => setPage("inbox")}>
        問い合わせに戻る
      </button>
    </p>
  );
}

export function StockPage() {
  return (
    <section className="ref">
      <Banner />
      <h2>在庫</h2>
      <p>問い合わせの確認で開く表と同じ内容です。</p>
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
          {INVENTORY_ROWS.map((row) => (
            <tr key={row.sku}>
              <td>{row.sku}</td>
              <td>{row.name}</td>
              <td>{row.warehouse}</td>
              <td>{row.qty}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function CustomersPage() {
  return (
    <section className="ref">
      <Banner />
      <h2>得意先</h2>
      <p>担当分けはそのままです。このデモでは得意先マスタを変更しません。</p>
      <table>
        <thead>
          <tr>
            <th>得意先</th>
            <th>エリア</th>
            <th>担当</th>
            <th>最終問い合わせ</th>
            <th>掛け率</th>
          </tr>
        </thead>
        <tbody>
          {CUSTOMERS.map((row) => {
            const rate = RATE_ROWS.find((item) => item.customer === row.name);
            return (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.area}</td>
                <td>{row.owner}</td>
                <td>{row.last}</td>
                <td>{rate?.rate ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export function QuotesPage() {
  return (
    <section className="ref">
      <Banner />
      <h2>見積</h2>
      <p>見積の確定と送付は、このデモの代表3手には入れていません。</p>
      <table>
        <thead>
          <tr>
            <th>番号</th>
            <th>得意先</th>
            <th>型番</th>
            <th>数量</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {QUOTE_ROWS.map((row) => (
            <tr key={row.no}>
              <td>{row.no}</td>
              <td>{row.customer}</td>
              <td>{row.sku}</td>
              <td>{row.qty}</td>
              <td>{row.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function SettingsPage() {
  return (
    <section className="ref">
      <Banner />
      <h2>設定</h2>
      <p>表示データは架空です。実在の会社名・在庫・価格ではありません。</p>
      <ul className="ref-list">
        <li>自動返信は行いません。</li>
        <li>単価と掛け率は担当者が確認する項目として残します。</li>
        <li>在庫の引当はこのデモでは行いません。</li>
      </ul>
    </section>
  );
}
