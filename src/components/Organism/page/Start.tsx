import { PAGESTART, PAGETERMOFSERVICE } from "@/constants/markdownpage";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function Start() {
  return (
    <div>
      <section>
        <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
          <div className="w-full mx-auto">
            <div className=" mx-auto text-base leading-relaxed text-gray-500">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {PAGESTART}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
