import { upworkCatalogItems } from "./upworkCatalog";

const priceList = upworkCatalogItems
  .map((i) => `${i.title.toLowerCase()} (${i.priceLabel.toLowerCase()})`)
  .join(", ");

/**
 * FAQ — rendered on /services, emitted as FAQPage JSON-LD, and given to the
 * AI assistant. Keep answers factual; they are public.
 */
export const faq = [
  {
    q: "What kind of projects does Ronak take on?",
    a: "Full-stack web work across Ruby on Rails and JavaScript: new Rails or Next.js builds, React and Vue front-ends, APIs and integrations, Rails version upgrades, performance fixes, and code review for existing codebases.",
  },
  {
    q: "Can you upgrade an old Ruby on Rails application?",
    a: "Yes. Rails upgrades are a specialty: upgrading the framework in an existing application, then testing to make sure every existing feature still works afterwards, with refactoring and CI/CD improvements where they help.",
  },
  {
    q: "How much does a project cost?",
    a: `It depends on scope. Fixed-price starting points on Upwork include ${priceList}. Larger or ongoing work is quoted after a short conversation about requirements.`,
  },
  {
    q: "Do you work with clients outside Canada?",
    a: "Yes. Ronak is based in London, Ontario, Canada and works remotely with teams in Canada, the US, the UK and Europe.",
  },
  {
    q: "Are you available for full-time roles as well as freelance work?",
    a: "Ronak is open to new opportunities, including full-stack roles at startups and established companies as well as freelance and contract projects.",
  },
  {
    q: "How do we get started?",
    a: "Send a message through the contact page or email ronakabhattrz@gmail.com with a few lines about the project, timeline and budget. You can also start a fixed-price package directly on Upwork.",
  },
];
