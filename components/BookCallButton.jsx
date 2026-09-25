import { HiOutlineCalendarDays } from "react-icons/hi2";

import { siteMeta } from "../lib/site";

/** "Book a call" link to siteMeta.bookingUrl. Renders nothing until it's set. */
const BookCallButton = ({ className = "btn-ghost", label = "Book a free call" }) => {
  if (!siteMeta.bookingUrl) return null;

  return (
    <a
      href={siteMeta.bookingUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      onClick={() => {
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { method: "book_call" });
        }
      }}
    >
      <HiOutlineCalendarDays aria-hidden />
      {label}
    </a>
  );
};

export default BookCallButton;
