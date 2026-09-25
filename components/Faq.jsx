import { HiPlus } from "react-icons/hi2";

/** FAQ accordion using native <details> — works without JS and is crawlable. */
const Faq = ({ items }) => {
  return (
    <section aria-labelledby="faq-heading" className="mb-24 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading" className="h3 mt-4">
          Common <span className="em">questions</span>
        </h2>
      </div>
      <div className="divide-y divide-white/[0.07] border-y border-white/[0.07] lg:col-span-8">
        {items.map(({ q, a }) => (
          <details key={q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-white sm:text-lg">
              {q}
              <HiPlus
                aria-hidden
                className="shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
              />
            </summary>
            <p className="mt-3 max-w-2xl text-[15px]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
