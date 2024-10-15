"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const newLibrarySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  github: z.string(),
  github_stars: z.coerce.number(),
  doc: z.string(),
  example_code: z.string(),
  tags: z.array(z.string()).optional().default([]),
});

type NewLibrary = z.infer<typeof newLibrarySchema>;

const AddLibrary = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLibrary>({
    resolver: zodResolver(newLibrarySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      github: "",
      github_stars: 0,
      doc: "",
      tags: ["frontend", "react", "backend", "zod", "form"],
    },
  });

  const router = useRouter();

  const onSubmit = async (formdata: NewLibrary) => {
    const { name, description, image, github, github_stars, doc, tags, example_code } =
      formdata;
    try {
      const { status } = await axios.post("/api/library", {
        name,
        description,
        image,
        github,
        github_stars,
        doc,
        tags,
        example_code
      });

      if (status === 201) {
        toast.success("Library added successfully");
        router.push("/");
      }
    } catch (error) {
      // Check if the error response exists and log the message
      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from the response if available
        const errorMessage =
          error.response.data?.error || "Error adding library";
        toast.error(errorMessage);
        console.error("Error details:", errorMessage);
      } else {
        // General error handling
        toast.error("Error adding library");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-5 p-40 h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold">Add new Library</h1>
      <div className="flex border p-5 rounded-lg gap-5 ">
        <div className="w-full flex flex-col gap-5">
          <Label htmlFor="name" className="text-base font-medium ">
            Library Name
          </Label>
          <Input
            type="text"
            placeholder="Library name"
            id="name"
            {...register("name")} // Register input
          />
          {errors.name && <p>{errors.name.message}</p>}

          <Label htmlFor="description" className="text-base font-medium ">
            Library description
          </Label>
          <Input
            type="text"
            placeholder="Library description"
            {...register("description")} // Register input
          />
          {errors.description && <p>{errors.description.message}</p>}

          <Label htmlFor="image" className="text-base font-medium ">
            Library image
          </Label>
          <Input
            type="text"
            placeholder="Library image"
            {...register("image")} // Register input
          />
          {errors.image && <p>{errors.image.message}</p>}

          <Label htmlFor="github" className="text-base font-medium ">
            Library Github
          </Label>
          <Input
            type="text"
            placeholder="Library Github"
            {...register("github")} // Register input
          />
          {errors.github && <p>{errors.github.message}</p>}
        </div>

        <div className="w-full flex flex-col gap-5">
          <Label htmlFor="github_stars" className="text-base font-medium ">
            Library stars
          </Label>
          <Input
            type="number"
            placeholder="Library stars"
            {...register("github_stars")} // Register input
          />
          {errors.github_stars && <p>{errors.github_stars.message}</p>}

          <Label htmlFor="doc" className="text-base font-medium ">
            Library documentation
          </Label>
          <Input
            type="text"
            placeholder="Library documentation"
            {...register("doc")} // Register input
          />
          {errors.doc && <p>{errors.doc.message}</p>}

          <Label htmlFor="tags" className="text-base font-medium ">
            Library tags
          </Label>
          <Input type="text" placeholder="Library tags" />
          {errors.tags && <p>{errors.tags.message}</p>}

          <Label htmlFor="tags" className="text-base font-medium ">
            Example Code
          </Label>
          <Input type="text" placeholder="example code" {...register("example_code")} />
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-fit text-lg font-medium">
        Save Library
      </Button>
    </form>
  );
};

export default AddLibrary;
