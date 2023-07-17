import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import Link from "next/link";

async function handleRootXmlFetch(url: string) {
  const res = await fetch(url);
  if (res.ok) {
    const xml = await res.text();
    return xml;
  }
  return "";
}

export default async function List({ searchParams }) {
  const xmlContent = await handleRootXmlFetch(searchParams.url);
  const xmlObj = new XMLParser().parse(xmlContent);
  return (
    <>
      <section className="mt-4 mx-auto w-1/2">
        <a href="/"> ← Back</a>
        <h1 className="text-2xl">Showing List for {searchParams.url}</h1>
        <table className="border">
          <thead>
            <tr className="border">
              <th className="border px-4 py-2">URL</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {xmlObj.sitemapindex.sitemap.map((item, index) => (
              <tr className="border" key={index}>
                <td className="border px-4 py-2">{item.loc}</td>
                <td className="border px-4 py-2">
                  <Link
                    target="_blank"
                    href={`/images?url=${item.loc}`}
                    className="bg-blue-700 text-white py-1.5 font-bold px-4 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
