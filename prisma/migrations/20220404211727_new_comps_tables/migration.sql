-- CreateTable
CREATE TABLE "PlatTIComponent" (
    "id" UUID NOT NULL,
    "componentName" VARCHAR(20) NOT NULL,
    "description" VARCHAR(200),
    "idParent" UUID,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatTIComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatComponentProperty" (
    "id" UUID NOT NULL,
    "idTIComponent" UUID NOT NULL,
    "propertyName" VARCHAR(50) NOT NULL,
    "propertyType" VARCHAR(20) NOT NULL,
    "description" VARCHAR(200),
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatComponentProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatTIComponent" ADD CONSTRAINT "PlatTIComponent_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "PlatTIComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatComponentProperty" ADD CONSTRAINT "fkPlatCPPlatTIComponent" FOREIGN KEY ("idTIComponent") REFERENCES "PlatTIComponent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
