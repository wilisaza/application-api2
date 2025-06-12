/*
  Warnings:

  - You are about to drop the column `shortName` on the `PlatClient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortName]` on the table `PlatCompany` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortName` to the `PlatCompany` table without a default value. This is not possible if the table is not empty.
*/
-- AlterTable
ALTER TABLE "PlatClient" DROP COLUMN "shortName";

-- AlterTable: Agregar shortName como nullable
ALTER TABLE "PlatCompany" ADD COLUMN     "shortName" VARCHAR(45);

-- Actualizar shortName con valores únicos temporales (usando name)
UPDATE "PlatCompany" SET "shortName" = LEFT("name", 45) WHERE "shortName" IS NULL;

-- AlterTable: Hacer shortName NOT NULL
ALTER TABLE "PlatCompany" ALTER COLUMN "shortName" SET NOT NULL;

-- Crear índice único
CREATE UNIQUE INDEX "PlatCompany_shortName_key" ON "PlatCompany"("shortName");
