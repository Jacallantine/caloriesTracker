/*
  Warnings:

  - You are about to drop the `_PlayerToTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_B_fkey";

-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "teamId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_PlayerToTeam";

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;
