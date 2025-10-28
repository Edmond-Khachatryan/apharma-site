-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "contentEn" TEXT,
ADD COLUMN     "contentHy" TEXT,
ADD COLUMN     "excerptEn" TEXT,
ADD COLUMN     "excerptHy" TEXT,
ADD COLUMN     "titleEn" TEXT,
ADD COLUMN     "titleHy" TEXT;

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionHy" TEXT,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameHy" TEXT;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionHy" TEXT,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameHy" TEXT;
