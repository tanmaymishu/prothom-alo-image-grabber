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

export default async function Images({ searchParams }) {
  const xmlContent = await findImages(searchParams.url);
  const xmlObj = new XMLParser().parse(xmlContent);
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
            {xmlObj.urlset.url.map((item, index) => (
              <tr className="border" key={index}>
                <td className="border px-4 py-2">
                  {Array.isArray(item["image:image"]) ? (
                    item["image:image"].map((image, imageIndex) => (
                      <div key={imageIndex}>
                        {image["image:loc"]}
                        <br />
                      </div>
                    ))
                  ) : (
                    <div>
                      {item["image:image"] != undefined &&
                        item["image:image"]["image:loc"]}
                      <br />
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {Array.isArray(item["image:image"]) ? (
                    item["image:image"].map((image, imageIndex) => (
                      <div key={imageIndex}>
                        <img
                          src={image["image:loc"]}
                          alt={`Image ${imageIndex}`}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      {item["image:image"] && (
                        <img
                          src={item["image:image"]["image:loc"]}
                          alt="Image Preview"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}