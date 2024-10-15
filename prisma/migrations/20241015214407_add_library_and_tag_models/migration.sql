-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "github_stars" INTEGER NOT NULL,
    "doc" TEXT NOT NULL,
    "example_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "libraryId" TEXT,
    CONSTRAINT "Tag_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
