"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Main() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function submitHandler() {
    if (!url.endsWith(".xml")) {
      return;
    }
    router.push(`/list?url=${url}`);
  }

  return (
    <>
      <main className="flex flex-col space-y-4 mt-4 justify-center items-center bg-none">
        <section>
          <h1 className="text-xl shadow-2xl text-center">
            Prothom Alo Image Grabber
          </h1>
        </section>
        <section className="flex space-x-2">
          <div>
            <input
              className="border-2 border-gray-500 rounded py-1 px-2"
              type="text"
              id="url"
              placeholder="Sitemap URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  submitHandler();
                }
              }}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-1.5 font-bold px-4 rounded"
              id="submit"
              onClick={submitHandler}
            >
              Search
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
