type Props = {
  open: number;
  check: number;
  replied: number;
};

function Spark({ values, accent }: { values: number[]; accent?: boolean }) {
  const max = Math.max(...values, 1);
  return (
    <span className={`spark${accent ? " is-accent" : ""}`} aria-hidden="true">
      {values.map((value, i) => (
        <i key={i} style={{ height: `${Math.max(18, (value / max) * 100)}%` }} />
      ))}
    </span>
  );
}

export function KpiStrip({ open, check, replied }: Props) {
  return (
    <section className="kpi" aria-label="今日の件数">
      <article>
        <span>未返信</span>
        <b>{open}</b>
        <Spark values={[3, 4, 2, 5, open]} accent />
      </article>
      <article>
        <span>要確認</span>
        <b>{check}</b>
        <Spark values={[2, 3, 2, 4, check]} />
      </article>
      <article>
        <span>本日返信済み</span>
        <b>{replied}</b>
        <Spark values={[1, 2, 3, 2, replied]} />
      </article>
    </section>
  );
}
