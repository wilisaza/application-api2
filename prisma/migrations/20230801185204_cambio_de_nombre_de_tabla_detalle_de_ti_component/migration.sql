/*
  Warnings:

  - You are about to drop the `PlatComponentProperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlatComponentProperty" DROP CONSTRAINT "fkPlatCPPlatTIComponent";

-- DropTable
DROP TABLE "PlatComponentProperty";

-- CreateTable
CREATE TABLE "PlatTIComponentProperty" (
    "id" UUID NOT NULL,
    "idTIComponent" UUID NOT NULL,
    "propertyName" VARCHAR(50) NOT NULL,
    "propertyType" VARCHAR(20) NOT NULL,
    "description" VARCHAR(200),
    "componentPropertySpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatTIComponentProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatTIComponentProperty" ADD CONSTRAINT "fkPlatTICPPlatTIComponent" FOREIGN KEY ("idTIComponent") REFERENCES "PlatTIComponent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
