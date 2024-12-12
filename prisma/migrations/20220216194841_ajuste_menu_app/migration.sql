/*
  Warnings:

  - You are about to drop the `PlatMenuapp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlatMenuapp" DROP CONSTRAINT "fkPlatMenuappPlatApplication1";

-- DropTable
DROP TABLE "PlatMenuapp";

-- CreateTable
CREATE TABLE "PlatMenuApplication" (
    "id" UUID NOT NULL,
    "idApplication" UUID NOT NULL,
    "menuGroup" VARCHAR(20) NOT NULL,
    "idParent" UUID NOT NULL,
    "optionName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "execType" VARCHAR(20) NOT NULL,
    "execCall" UUID NOT NULL,
    "execParams" VARCHAR(200) NOT NULL,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatMenuApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatMenuApplication" ADD CONSTRAINT "fkPlatMenuappPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
