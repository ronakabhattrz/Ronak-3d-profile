/**
 * Consistent top-of-page intro: eyebrow label, the page's single H1, and a lead.
 * `title` may contain JSX (e.g. <span className="em">…</span>).
 * Uses CSS entrance animations so the H1 paints without waiting for JS (LCP).
 */
const PageHeader = ({ eyebrow, title, children, align = "left", aside }) => {
  const centered = align === "center";

  return (
    <header
      className={`flex flex-col gap-8 pb-12 pt-32 sm:pb-16 sm:pt-40 lg:flex-row lg:items-end lg:justify-between ${
        centered ? "items-center text-center lg:flex-col lg:items-center" : ""
      }`}
    >
      <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <p
          className="animate-fade-up eyebrow"
          style={{ animationDelay: "0.05s" }}
        >
          {eyebrow}
        </p>
        <h1
          className="animate-fade-up h2 mt-5"
          style={{ animationDelay: "0.12s" }}
        >
          {title}
        </h1>
        {children ? (
          <div
            style={{ animationDelay: "0.2s" }}
            className={`animate-fade-up mt-6 max-w-2xl text-base sm:text-lg [&_p]:text-inherit text-zinc-400 ${
              centered ? "mx-auto" : ""
            }`}
          >
            {children}
          </div>
        ) : null}
      </div>
      {aside ? (
        <div
          className="animate-fade-up shrink-0"
          style={{ animationDelay: "0.25s" }}
        >
          {aside}
        </div>
      ) : null}
    </header>
  );
};

export default PageHeader;
