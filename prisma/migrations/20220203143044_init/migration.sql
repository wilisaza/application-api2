-- CreateTable
CREATE TABLE "PlatApplication" (
    "id" UUID NOT NULL,
    "shortName" VARCHAR(45),
    "fullName" VARCHAR(45),
    "urlLogo" VARCHAR(245),
    "urlMain" VARCHAR(245),
    "idCompany" UUID NOT NULL,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatClient" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "idApplication" UUID NOT NULL,
    "idCompany" UUID NOT NULL,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatComponent" (
    "id" UUID NOT NULL,
    "idApplication" UUID NOT NULL,
    "description" TEXT,
    "idComponent" UUID NOT NULL,
    "componentType" VARCHAR(50) NOT NULL,
    "version" INTEGER NOT NULL,
    "specification" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatUserClient" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "idClient" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatUserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatMenuapp" (
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
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatMenuapp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatClient" ADD CONSTRAINT "fkPlatClientPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatComponent" ADD CONSTRAINT "fkPlatComponentPlatAplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatUserClient" ADD CONSTRAINT "fkPlatUserClientPlatClient1" FOREIGN KEY ("idClient") REFERENCES "PlatClient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatMenuapp" ADD CONSTRAINT "fkPlatMenuappPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
