/*
  Warnings:

  - Added the required column `teamId` to the `PlayerInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PlayerInstance" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;
