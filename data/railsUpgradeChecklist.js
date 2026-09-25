/** Rails upgrade readiness checklist — /resources/rails-upgrade-checklist */
export const checklist = [
  {
    title: "Before you start",
    items: [
      "Write down the current Rails and Ruby versions (bin/rails -v, ruby -v) and pick a target version.",
      "Read the official “Upgrading Ruby on Rails” guide and release notes for every version in between.",
      "Confirm the target Rails version supports your Ruby version, and plan a Ruby upgrade if not.",
      "Make sure the test suite runs and passes on the current version before changing anything.",
      "Check that critical flows (sign-up, login, payments, admin) have test coverage; add tests where they don't.",
      "Have CI run the suite on every change so each upgrade step is verified.",
    ],
  },
  {
    title: "Dependencies",
    items: [
      "Run bundle outdated to see which gems lag behind.",
      "Find gems that are unmaintained or pin an old Rails version, and plan replacements.",
      "Upgrade gems that already support both Rails versions first, in small commits.",
      "Check JavaScript and asset tooling: Webpacker is retired, so plan a move to importmap, jsbundling-rails or cssbundling-rails if needed.",
    ],
  },
  {
    title: "The upgrade",
    items: [
      "Upgrade to the latest patch release of your current version first, and fix every deprecation warning.",
      "Move one minor version at a time (for example 6.0 → 6.1 → 7.0) rather than skipping versions.",
      "Consider dual booting (for example with the next_rails gem) to run the old and new versions side by side.",
      "Run bin/rails app:update and review each config change instead of accepting them all.",
      "Keep config.load_defaults on the old version, then enable new framework defaults one at a time.",
      "On Rails 6 and later, run bin/rails zeitwerk:check to confirm autoloading works.",
    ],
  },
  {
    title: "Verify & ship",
    items: [
      "Run the full test suite and a manual smoke test of the critical flows.",
      "Deploy to a staging environment with production-like data before production.",
      "Have a rollback plan, and watch error tracking and performance closely after release.",
      "Once stable, remove dual-boot code and old framework-defaults files, then bump config.load_defaults.",
    ],
  },
];
