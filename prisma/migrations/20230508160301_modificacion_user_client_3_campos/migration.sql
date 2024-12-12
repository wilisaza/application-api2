-- AlterTable
ALTER TABLE "PlatUserClient" ADD COLUMN     "alternateFactor" TEXT DEFAULT E'',
ADD COLUMN     "alternatePassword" TEXT DEFAULT E'',
ADD COLUMN     "alternateUser" TEXT DEFAULT E'';
