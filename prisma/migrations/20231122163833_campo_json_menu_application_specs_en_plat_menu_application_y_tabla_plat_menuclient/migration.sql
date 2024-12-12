-- AlterTable
ALTER TABLE "PlatMenuApplication" ADD COLUMN     "menuApplicationSpecs" JSONB;

-- CreateTable
CREATE TABLE "PlatMenuClient" (
    "id" UUID NOT NULL,
    "idMenuApplication" UUID NOT NULL,
    "idClient" UUID NOT NULL,
    "enableMenu" BOOLEAN DEFAULT false,
    "menuClientSpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatMenuClient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatMenuClient_idMenuApplication_idClient_key" ON "PlatMenuClient"("idMenuApplication", "idClient");

-- AddForeignKey
ALTER TABLE "PlatMenuClient" ADD CONSTRAINT "fkPlatMenuClientPlatMenuApplication1" FOREIGN KEY ("idMenuApplication") REFERENCES "PlatMenuApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatMenuClient" ADD CONSTRAINT "fkPlatMenuClientPlatClient1" FOREIGN KEY ("idClient") REFERENCES "PlatClient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
