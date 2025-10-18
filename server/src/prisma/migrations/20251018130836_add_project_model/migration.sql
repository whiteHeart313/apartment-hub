/*
  Warnings:

  - You are about to drop the column `project` on the `Apartment` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."idx_project";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500),
    "location" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE INDEX "idx_project_name" ON "Project"("name");

-- Insert existing projects from apartment data
INSERT INTO "Project" ("name", "createdAt", "updatedAt")
SELECT DISTINCT "project", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Apartment"
WHERE "project" IS NOT NULL;

-- Add projectId column as nullable first
ALTER TABLE "Apartment" ADD COLUMN "projectId" INTEGER;

-- Update apartments with correct projectId
UPDATE "Apartment" 
SET "projectId" = "Project"."id"
FROM "Project"
WHERE "Apartment"."project" = "Project"."name";

-- Make projectId NOT NULL after data is populated
ALTER TABLE "Apartment" ALTER COLUMN "projectId" SET NOT NULL;

-- Drop the old project column
ALTER TABLE "Apartment" DROP COLUMN "project";

-- CreateIndex
CREATE INDEX "idx_project_id" ON "Apartment"("projectId");

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
