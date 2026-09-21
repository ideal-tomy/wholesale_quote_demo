import { useEffect } from "react";
import { Link } from "react-router-dom";
import { landing } from "../content/landing";
import "../styles/lp.css";

function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </>
  );
}

export function LandingPage() {
  const { back, hero, time, remain, after, faq, end, foot } = landing;

  useEffect(() => {
    const prev = document.title;
    document.title = "このデモで見てほしいこと｜青葉電材";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="lp-page">
      <header className="lp-hd">
        <div className="lp-hd-in">
          <Link className="lp-btn lp-btn-sm" to="/desk">
            {back}
          </Link>
        </div>
      </header>

      <main>
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <div className="lp-wrap">
            <h1 id="lp-hero-title">
              <Lines lines={hero.title} />
            </h1>
            {hero.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="lp-sec" id={time.id} aria-labelledby="lp-time-title">
          <div className="lp-wrap">
            <h2 id="lp-time-title">
              <Lines lines={time.title} />
            </h2>
            {time.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="lp-wrap is-wide">
            <div className="lp-shots">
              {time.shots.map((shot) => (
                <figure key={shot.src} className="lp-shot">
                  <img src={shot.src} alt={shot.alt} />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id={remain.id} aria-labelledby="lp-remain-title">
          <div className="lp-wrap">
            <h2 id="lp-remain-title">
              <Lines lines={remain.title} />
            </h2>
            {remain.lead.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ol className="lp-jobs">
              {remain.jobs.map((job, i) => (
                <li key={job}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {job}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lp-after" id={after.id} aria-labelledby="lp-after-title">
          <div className="lp-after-in">
            <h2 id="lp-after-title">
              <Lines lines={after.title} />
            </h2>
            {after.lead.map((p) => (
              <p key={p} className="lp-after-lead">
                {p}
              </p>
            ))}
            <ol className="lp-path">
              {after.steps.map((step, i) => (
                <li key={step.num} className={i === after.steps.length - 1 ? "is-last" : undefined}>
                  <span className="lp-path-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="lp-after-foot">{after.foot}</p>
          </div>
        </section>

        <section className="lp-sec" id={faq.id} aria-labelledby="lp-faq-title">
          <div className="lp-wrap">
            <p className="lp-kicker">{faq.kicker}</p>
            <h2 id="lp-faq-title">
              <Lines lines={faq.title} />
            </h2>
            <p className="lp-faq-lead">{faq.lead}</p>
            <div className="lp-faq">
              {faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-end" aria-labelledby="lp-end-title">
          <div className="lp-wrap">
            <h2 id="lp-end-title">
              <Lines lines={end.title} />
            </h2>
            <p>{end.body}</p>
            <Link className="lp-btn" to="/desk">
              {end.cta}
            </Link>
          </div>
        </section>
      </main>

      <footer className="lp-ft">
        <div className="lp-ft-in">
          <p>{foot.note}</p>
          <Link to="/desk">{back}</Link>
        </div>
      </footer>
    </div>
  );
}
