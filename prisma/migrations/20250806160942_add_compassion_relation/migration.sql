-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COMMON_HUMANITY', 'MINDFULNESS', 'KINDNESS');

-- CreateTable
CREATE TABLE "CompassionEntry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompassionEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompassionEntry" ADD CONSTRAINT "CompassionEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
