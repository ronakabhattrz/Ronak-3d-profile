import CountUp from "react-countup";

import { stats } from "../data/profile";

const Stats = ({ className = "" }) => {
  return (
    <dl
      className={`grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] gap-px md:grid-cols-4 ${className}`}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col-reverse bg-ink-900 px-6 py-7 sm:px-8 sm:py-9"
        >
          <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            {s.label}
          </dt>
          <dd className="text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-5xl">
            <CountUp
              start={0}
              end={s.end}
              duration={2.2}
              enableScrollSpy
              scrollSpyOnce
            />
            <span className="text-accent">{s.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Stats;
