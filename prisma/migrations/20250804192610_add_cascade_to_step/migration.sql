-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_goalId_fkey";

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
