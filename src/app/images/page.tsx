import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import Link from "next/link";
async function findImages(url: string) {
  const res = await fetch(url);
  if (res.ok) {
    const xml = await res.text();
    return xml;
  }
  return "";
}

export default async function Images({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  const links: string[] = [];
  function extractLinks(urlObj: any) {
    if (Array.isArray(urlObj)) {
      urlObj.forEach((u) => {
        extractLinks(u);
      });
    }
    if (urlObj["image:image"]) {
      if (Array.isArray(urlObj["image:image"])) {
        extractLinks(urlObj["image:image"]);
      } else {
        links.push(urlObj["image:image"]["image:loc"]);
      }
    } else {
      if (urlObj["image:loc"]) {
        links.push(urlObj["image:loc"]);
      }
    }
  }
  const xmlContent = await findImages(searchParams.url);
  const xmlObj = new XMLParser().parse(xmlContent);
  xmlObj.urlset.url.forEach((u: any) => {
    extractLinks(u);
  });
  return (
    <>
      <section className="mt-4 mx-14">
        <Link href={`/`}> ← Back to Home</Link>
        <h1 className="text-2xl">Showing List for {searchParams.url}</h1>
        <table className="border">
          <thead>
            <tr className="border">
              <th className="border px-4 py-2">Image Link</th>
              <th className="border px-4 py-2">Preview</th>
            </tr>
          </thead>
          <tbody>
            {links.map((item: any, index: number) => (
              <tr className="border" key={index}>
                <td className="border px-4 py-2">
                  <div>{item}</div>
                </td>
                <td className="border px-4 py-2">
                  <img
                    src={item}
                    alt={`Image ${index}`}
                    style={{ maxWidth: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
