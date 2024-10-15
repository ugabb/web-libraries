"use client";

import { Header } from "./components/Header";
import libraries from "../../libraries.json";
import CardLibrary from "./components/CardLibrary";

export interface Libs {
  name: string;
  description: string;
  image: string;
  github: string;
  github_stars: number;
  doc: string;
  example_code: string;
  tag: string[];
}

const libs: Libs[] = libraries;

export default function Home() {
  return (
    <div className="pb-20">
      <Header />
      <main className="flex flex-col gap-5 px-20 mt-20">
        <div className="flex flex-col gap-5 md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {libs.map((lib) => (
            <CardLibrary key={lib.github} lib={lib} />
          ))}
        </div>
      </main>
    </div>
  );
}
