import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    github: z.string(),
    github_stars: z.number(),
    doc: z.string(),
    example_code: z.string(),
    tags: z.array(z.string()),
});

export async function POST(req: Request) {
    try {
        // Parse the incoming JSON request body
        const body = await req.json();

        // Validate the parsed body against the schema
        const validatedData = bodySchema.parse(body);

        // Create a new library entry in the database
        const newLibrary = await prisma.library.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                image: validatedData.image,
                github: validatedData.github,
                github_stars: validatedData.github_stars,
                doc: validatedData.doc,
                example_code: validatedData.example_code,
                tag: {
                    create: validatedData.tags.map(tag => ({ name: tag })), // Create tags based on the provided names
                },
            },

        });

        // Return the created library entry
        return NextResponse.json(newLibrary, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Handle validation errors and database errors separately
        if (error instanceof z.ZodError) {
            // Validation error
            return NextResponse.json(
                {
                    error: "Validation failed",
                    issues: error.errors,
                },
                { status: 400 }
            );
        }

        // Database error or other unexpected errors
        console.error("Error creating library:", error);
        return NextResponse.json(
            {
                error: "Failed to create library",
                details: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
      const libraries = await prisma.library.findMany({
        include: {
          tag: true, // Include tags if needed
        },
      });
      return NextResponse.json(libraries, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
      return NextResponse.json({ error: "Failed to fetch libraries" }, { status: 500 });
    }
  }
