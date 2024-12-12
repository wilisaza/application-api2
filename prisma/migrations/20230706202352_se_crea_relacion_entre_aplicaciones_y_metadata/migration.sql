-- AddForeignKey
ALTER TABLE "PlatMetaDataApplication" ADD CONSTRAINT "fkPlatMetaDataAppPlatApplication1" FOREIGN KEY ("idApplication") REFERENCES "PlatApplication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
