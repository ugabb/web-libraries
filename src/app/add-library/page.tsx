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
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const tagsExample = [
  {
    value: "frontend",
    label: "Frontend",
  },
  {
    value: "backend",
    label: "Backend",
  },
  {
    value: "framework",
    label: "Framework",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

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
  const [openSelect, setOpenSelect] = useState(false);
  const [tags, setValueTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const handleAddTag = (tag: string) => {
    if (!tagsExample.find((framework) => framework.value === tag)) {
      // Add the new tag to the tagsExample array
      tagsExample.push({ value: tag, label: tag });
    }
    // Add the tag to the selected tags state
    setValueTags([...tags, tag]);
    setValue("tags", [...tags, tag]);
  };
  
  const handleDeleteTag = (tag: string) => {
    setValueTags(tags.filter((t) => t !== tag));
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  const router = useRouter();

  const onSubmit = async (formdata: NewLibrary) => {
    const {
      name,
      description,
      image,
      github,
      github_stars,
      doc,
      tags,
      example_code,
    } = formdata;
    try {
      const { status } = await axios.post("/api/library", {
        name,
        description,
        image,
        github,
        github_stars,
        doc,
        tags,
        example_code,
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
            placeholder="React"
            id="name"
            {...register("name")} // Register input
          />
          {errors.name && <p>{errors.name.message}</p>}

          <Label htmlFor="description" className="text-base font-medium ">
            Library description
          </Label>
          <Input
            type="text"
            placeholder="Frontend library for building user interfaces"
            {...register("description")} // Register input
          />
          {errors.description && <p>{errors.description.message}</p>}

          <Label htmlFor="image" className="text-base font-medium ">
            Library image
          </Label>
          <Input
            type="text"
            placeholder="https://example.com/image.png"
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

          <Label htmlFor="github_stars" className="text-base font-medium ">
            Library stars
          </Label>
          <Input
            type="number"
            placeholder="50"
            {...register("github_stars")} // Register input
          />
          {errors.github_stars && <p>{errors.github_stars.message}</p>}
        </div>

        <div className="w-full flex flex-col gap-5">
          <Label htmlFor="doc" className="text-base font-medium ">
            Library documentation
          </Label>
          <Input
            type="text"
            placeholder="https://example.com/doc"
            {...register("doc")} // Register input
          />
          {errors.doc && <p>{errors.doc.message}</p>}

          <Label htmlFor="tags" className="text-base font-medium">
            Example Code
          </Label>
          <Textarea
            placeholder="console.log('Hello World!')"
            {...register("example_code")}
            className="h-36"
          />
          {errors.tags && <p>{errors.tags.message}</p>}

          <Label htmlFor="tags" className="text-base font-medium ">
            Tags
          </Label>
          <Popover open={openSelect} onOpenChange={setOpenSelect}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSelect}
                className="w-full justify-between"
              >
                {tags.length > 0
                  ? tagsExample.find((framework) =>
                      tags.includes(framework.value)
                    )?.label
                  : "Select a tag do describe your library"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search or add a new tag..."
                  onKeyDown={(e) => {
                    const newTag = e.currentTarget.value.trim();
                    if (e.key === "Enter" && newTag) {
                      e.preventDefault();

                      // Check if the tag already exists in the array or in the tags
                      if (
                        !tags.includes(newTag) &&
                        !tagsExample.find((t) => t.value === newTag)
                      ) {
                        handleAddTag(newTag); // Adds the new custom tag
                      }

                      // Clear the input after adding the tag
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {tagsExample.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          if (tags.includes(currentValue)) {
                            setValueTags(
                              tags.filter((tag) => tag !== currentValue)
                            );
                            setValue(
                              "tags",
                              tags.filter((tag) => tag !== currentValue)
                            );
                          } else {
                            handleAddTag(currentValue);
                          }
                          setOpenSelect(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            tags.find((tag) => tag === framework.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-3 flex-wrap">
            {tags.length > 0 &&
              tags.map((tag) => (
                <Badge
                  key={tag}
                  className="flex items-center justify-between gap-1"
                >
                  {
                    tagsExample.find((framework) => framework.value === tag)
                      ?.label
                  }
                  <X
                    className="size-3 cursor-pointer"
                    onClick={() => handleDeleteTag(tag)}
                  />
                </Badge>
              ))}
          </div>
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
