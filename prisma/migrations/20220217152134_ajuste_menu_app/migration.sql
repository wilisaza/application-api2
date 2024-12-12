-- RenameForeignKey
ALTER TABLE "PlatMenuApplication" RENAME CONSTRAINT "fkPlatMenuappPlatApplication1" TO "fkPlatMenuAppPlatApplication1";

-- AddForeignKey
ALTER TABLE "PlatMenuApplication" ADD CONSTRAINT "PlatMenuApplication_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "PlatMenuApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
