-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "unit_name" VARCHAR(255) NOT NULL,
    "unit_number" VARCHAR(255) NOT NULL,
    "project" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_unit_number_key" ON "Apartment"("unit_number");

-- CreateIndex
CREATE INDEX "idx_project" ON "Apartment"("project");

-- CreateIndex
CREATE INDEX "idx_unit_number" ON "Apartment"("unit_number");
