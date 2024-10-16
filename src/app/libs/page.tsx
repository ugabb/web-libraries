"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import CardLibrary from "../components/CardLibrary";

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

interface Tag{
  id: string;
  name: string;
  librayId: string;
}

// const libs: Libs[] = libraries;

export default function Home() {
  const [libs, setLibs] = useState<Libs[]>([]);
  async function getLibraries() {
    try {
      const { data, status } = await axios.get("/api/library");
      if (status === 200) {
        setLibs(data);
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  }

  useEffect(() => {
    getLibraries();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="flex flex-col gap-5 px-20 mt-20">
        <div className="flex flex-col gap-5 md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {libs.map((lib) => (
            <CardLibrary key={lib.id} lib={lib} />
          ))}
        </div>
      </main>
    </div>
  );
}
