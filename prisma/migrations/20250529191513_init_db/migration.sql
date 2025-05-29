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
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "applicationSpecs" JSONB,

    CONSTRAINT "PlatApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatApplicationPrivileges" (
    "id" UUID NOT NULL,
    "idApplication" UUID NOT NULL,
    "sid" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatApplicationPrivileges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatClient" (
    "id" UUID NOT NULL,
    "shortName" VARCHAR(45),
    "description" TEXT,
    "idApplication" UUID NOT NULL,
    "idCompany" UUID NOT NULL,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "clientSpecs" JSONB,

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
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatUserClient" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "idClient" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "alternateUser" TEXT DEFAULT '',
    "alternatePassword" TEXT DEFAULT '',
    "alternateFactor" TEXT DEFAULT '',
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatUserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatMenuApplication" (
    "id" UUID NOT NULL,
    "idApplication" UUID NOT NULL,
    "menuGroup" VARCHAR(20) NOT NULL,
    "idParent" UUID,
    "optionName" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "execType" VARCHAR(20) NOT NULL,
    "execCall" UUID,
    "execParams" VARCHAR(200),
    "menuApplicationSpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatMenuApplication_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "PlatTIComponent" (
    "id" UUID NOT NULL,
    "componentName" VARCHAR(20) NOT NULL,
    "description" VARCHAR(200),
    "idParent" UUID,
    "componentSpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatTIComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatMetaDataApplication" (
    "id" UUID NOT NULL,
    "idApplication" UUID NOT NULL,
    "owner" VARCHAR(50) NOT NULL,
    "tableName" VARCHAR(50) NOT NULL,
    "columnName" VARCHAR(50) NOT NULL,
    "languageCode" VARCHAR(10) NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(500),

    CONSTRAINT "PlatMetaDataApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatUser" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),
    "fullName" VARCHAR(100),
    "password" VARCHAR(255),
    "authProvider" VARCHAR(50),
    "providerId" VARCHAR(100),
    "providerData" JSONB,
    "lastLoginAt" TIMESTAMP(3),
    "userSpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatCompany" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "companySpecs" JSONB,
    "isEnabled" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatCompany_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatApplicationPrivileges_idApplication_sid_key" ON "PlatApplicationPrivileges"("idApplication", "sid");

-- CreateIndex
CREATE UNIQUE INDEX "PlatMenuClient_idMenuApplication_idClient_key" ON "PlatMenuClient"("idMenuApplication", "idClient");

-- CreateIndex
CREATE UNIQUE INDEX "PlatMetaDataApplication_idApplication_owner_tableName_colum_key" ON "PlatMetaDataApplication"("idApplication", "owner", "tableName", "columnName", "languageCode");

-- AddForeignKey
ALTER TABLE "PlatApplication" ADD CONSTRAINT "PlatApplication_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "PlatCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatApplicationPrivileges" ADD CONSTRAINT "fkPlatAppPrivPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatClient" ADD CONSTRAINT "fkPlatClientPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatClient" ADD CONSTRAINT "PlatClient_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "PlatCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatComponent" ADD CONSTRAINT "fkPlatComponentPlatAplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatUserClient" ADD CONSTRAINT "fkPlatUserClientPlatClient1" FOREIGN KEY ("idClient") REFERENCES "PlatClient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatUserClient" ADD CONSTRAINT "PlatUserClient_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "PlatUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatMenuApplication" ADD CONSTRAINT "PlatMenuApplication_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "PlatMenuApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatMenuApplication" ADD CONSTRAINT "fkPlatMenuAppPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatMenuClient" ADD CONSTRAINT "fkPlatMenuClientPlatMenuApplication1" FOREIGN KEY ("idMenuApplication") REFERENCES "PlatMenuApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatMenuClient" ADD CONSTRAINT "fkPlatMenuClientPlatClient1" FOREIGN KEY ("idClient") REFERENCES "PlatClient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlatTIComponent" ADD CONSTRAINT "PlatTIComponent_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "PlatTIComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatMetaDataApplication" ADD CONSTRAINT "fkPlatMetaDataAppPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
