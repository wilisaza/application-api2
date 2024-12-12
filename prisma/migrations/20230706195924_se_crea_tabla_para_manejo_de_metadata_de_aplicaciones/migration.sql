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

-- CreateIndex
CREATE UNIQUE INDEX "PlatMetaDataApplication_idApplication_owner_tableName_colum_key" ON "PlatMetaDataApplication"("idApplication", "owner", "tableName", "columnName", "languageCode");
