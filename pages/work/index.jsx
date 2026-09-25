import PageHeader from "../../components/PageHeader";
import UpworkProjectCatalog from "../../components/UpworkProjectCatalog";
import WorkSlider from "../../components/WorkSlider";

const Work = () => {
  return (
    <div className="container max-w-content">
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Selected <span className="em">work.</span>
          </>
        }
      >
        <p>
          Major sites and products I&apos;ve shipped, followed by fixed-price
          packages you can start on Upwork today.
        </p>
      </PageHeader>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">
          Major projects
        </h2>
        <WorkSlider />
      </section>

      <UpworkProjectCatalog />
    </div>
  );
};

export default Work;
