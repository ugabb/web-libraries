import React from "react";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { GoStarFill } from "react-icons/go";
import { Libs } from "../page";
import { ExternalLink } from "lucide-react";
import { indigo } from "tailwindcss/colors";

interface CardLibraryProps {
  lib: Libs;
}

const CardLibrary = ({ lib }: CardLibraryProps) => {
  return (
    <div
      key={lib.name}
      className="flex flex-col gap-2 p-4 bg-card dark:border rounded-2xl relative drop-shadow-lg"
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1 ">
          <img
            src={lib.image}
            alt={lib.name}
            className="w-12 h-12 object-cover rounded-full bg-foreground"
          />
          <h2 className="text-lg font-semibold">{lib.name}</h2>
          <p className="text-sm text-gray-600">{lib.description}</p>
        </div>
        <div className="flex flex-col items-center absolute top-2 right-2">
          <GoStarFill className="text-indigo-400 size-5 " />
          <span className="text-xs font-medium">{lib.github_stars}</span>
        </div>
      </div>
      <pre className="text-sm text-gray-600 bg-gray-200 dark:bg-gray-300 p-2 rounded-lg max-w-full text-wrap">
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          wrapLines
          customStyle={{
            backgroundColor: "transparent",
            height: "5rem",
            scrollbarColor: `${indigo[500]} transparent`,
            scrollbarWidth: "thin",
            textWrap: "wrap",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {lib.example_code}
        </SyntaxHighlighter>
      </pre>

      <div className="flex items-center gap-2">
        <a
          href={lib.github}
          className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1"
          target="_blank"
        >
          Github
          <ExternalLink className="w-4 h-4 inline-block" />
        </a>
        <a
          href={lib.doc}
          className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1"
          target="_blank"
        >
          Documentation
          <ExternalLink className="w-4 h-4 inline-block" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {lib.tag.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold bg-accent-foreground p-1 rounded-lg text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CardLibrary;
