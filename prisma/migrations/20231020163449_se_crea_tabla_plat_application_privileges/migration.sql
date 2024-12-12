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

-- CreateIndex
CREATE UNIQUE INDEX "PlatApplicationPrivileges_idApplication_sid_key" ON "PlatApplicationPrivileges"("idApplication", "sid");

-- AddForeignKey
ALTER TABLE "PlatApplicationPrivileges" ADD CONSTRAINT "fkPlatAppPrivPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
