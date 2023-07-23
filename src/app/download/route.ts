import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { NextResponse } from "next/server";
async function findImages(url: string) {
  const res = await fetch(url);
  if (res.ok) {
    const xml = await res.text();
    return xml;
  }
  return "";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
  const xmlContent = await findImages(searchParams.get("url") as string);
  const xmlObj = new XMLParser().parse(xmlContent);
  xmlObj.urlset.url.forEach((u: any) => {
    extractLinks(u);
  });
  const csvString = links.map((url) => `"${url}"`).join("\n");

  const res = new NextResponse(csvString);
  // Set the response headers to indicate a downloadable file
  res.headers.set("Content-Type", "text/csv");
  res.headers.set("Content-Disposition", 'attachment; filename="links.csv"');
  return res;
}
