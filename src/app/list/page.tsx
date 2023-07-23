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

export default async function List({
  searchParams,
}: {
  searchParams: { url: string };
}) {
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
            {xmlObj.sitemapindex.sitemap
              .slice(2)
              .map((item: any, index: number) => (
                <tr className="border" key={index}>
                  <td className="border px-4 py-2">{item.loc}</td>
                  <td className="px-4 py-2 flex">
                    <Link
                      target="_blank"
                      href={`/images?url=${item.loc}`}
                      className="bg-blue-700 text-white py-1.5 font-bold px-4 rounded"
                    >
                      View
                    </Link>
                    <Link
                      target="_blank"
                      href={`/download?url=${item.loc}`}
                      className="bg-green-700 text-white py-1.5 font-bold px-4 rounded ml-2"
                    >
                      Download
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
