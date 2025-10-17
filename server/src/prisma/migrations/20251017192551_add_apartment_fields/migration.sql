-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "area" DECIMAL(8,2) NOT NULL DEFAULT 0,
ADD COLUMN     "bathrooms" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'available';

-- CreateIndex
CREATE INDEX "idx_status" ON "Apartment"("status");
