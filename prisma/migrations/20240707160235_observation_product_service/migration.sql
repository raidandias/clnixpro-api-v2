-- AlterTable
ALTER TABLE "ItemCatalog" ALTER COLUMN "observationForProfessional" DROP NOT NULL,
ALTER COLUMN "observationForProfessional" SET DEFAULT '',
ALTER COLUMN "observationForPatient" DROP NOT NULL,
ALTER COLUMN "observationForPatient" SET DEFAULT '';
