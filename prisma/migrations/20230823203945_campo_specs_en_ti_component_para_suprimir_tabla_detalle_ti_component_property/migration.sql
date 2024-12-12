/*
  Warnings:

  - You are about to drop the `PlatTIComponentProperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlatTIComponentProperty" DROP CONSTRAINT "fkPlatTICPPlatTIComponent";

-- AlterTable
ALTER TABLE "PlatTIComponent" ADD COLUMN     "componentSpecs" JSONB;

-- DropTable
DROP TABLE "PlatTIComponentProperty";
