"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import CardLibrary from "../components/CardLibrary";
import { useSearchParams } from "next/navigation";

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
  const [allLibs, setAllLibs] = useState<Libs[]>([]); // original list of libraries
  const [filteredLibs, setFilteredLibs] = useState<Libs[]>([]); // filtered libraries
  const [filter, setFilter] = useState({
    name: "",
    tag: "",
  });

  // Fetch the libraries from the API once
  async function getLibraries() {
    try {
      const { data, status } = await axios.get("/api/library");
      if (status === 200) {
        setAllLibs(data); // Save the original libraries
        setFilteredLibs(data); // Initially, no filters, so show all libraries
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  }

  useEffect(() => {
    getLibraries();
  }, []);

  // Get query params from URL and update the filter state
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const tag = searchParams.get("tag");
    if (name || tag) {
      setFilter({ name: name || "", tag: tag || "" });
    } else{
      setFilter({ name: "", tag: "" });
    }
  }, [searchParams]);

  // Filter the libraries based on the search params and original list
  useEffect(() => {
    if (filter.name || filter.tag) {
      const filtered = allLibs.filter((lib) => {
        if (filter.name && filter.tag) {
          return (
            lib.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            lib.tag.some((t) => t.name.toLowerCase().includes(filter.tag.toLowerCase()))
          );
        } else if (filter.name) {
          return lib.name.toLowerCase().includes(filter.name.toLowerCase());
        } else if (filter.tag) {
          return lib.tag.some((t) => t.name.toLowerCase().includes(filter.tag.toLowerCase()));
        }
      });
      setFilteredLibs(filtered); // Update filteredLibs instead of overwriting allLibs
    } else {
      setFilteredLibs(allLibs); // If no filter, reset to original list
    }
  }, [filter, allLibs]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="flex flex-col gap-5 px-20 mt-20">
        <div className="flex flex-col gap-5 md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLibs.map((lib) => (
            <CardLibrary key={lib.id} lib={lib} />
          ))}
        </div>
      </main>
    </div>
  );
}
