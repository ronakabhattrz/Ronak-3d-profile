import Head from "next/head";

/** Emits one or more JSON-LD objects into <head>. `id` keeps Head dedupe stable. */
const JsonLd = ({ id, data }) => (
  <Head>
    <script
      key={`jsonld-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
);

export default JsonLd;
