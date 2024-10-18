"use client";

import { Suspense } from "react";
import { Header } from "../components/Header";
import { Loader2Icon } from "lucide-react";
import MainLibs from "../components/MainLibs";

export interface Libs {
  id?: string;
  name: string;
  description: string;
  image: string;
  github: string;
  github_stars: number;
  doc: string;
  example_code: string;
  tag: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  librayId: string;
}

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2Icon size={64} />
          </div>
        }
      >
        <MainLibs />
      </Suspense>
    </div>
  );
}
