-- AlterTable
ALTER TABLE "DiaryEntry" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#f87171',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
