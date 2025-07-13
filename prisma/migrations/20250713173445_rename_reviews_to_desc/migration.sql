/*
  Warnings:

  - You are about to drop the column `reviews` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "reviews",
ADD COLUMN     "desc" TEXT NOT NULL DEFAULT '';
