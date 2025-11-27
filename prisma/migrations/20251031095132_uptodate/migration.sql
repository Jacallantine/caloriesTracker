/*
  Warnings:

  - The primary key for the `MapInstance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerInstanceId` on the `MapInstance` table. All the data in the column will be lost.
  - You are about to drop the `_MapInstanceToPlayerInstance` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `MapInstance` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."_MapInstanceToPlayerInstance" DROP CONSTRAINT "_MapInstanceToPlayerInstance_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MapInstanceToPlayerInstance" DROP CONSTRAINT "_MapInstanceToPlayerInstance_B_fkey";

-- AlterTable
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_pkey",
DROP COLUMN "playerInstanceId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MapInstance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."PlayerInstance" ADD COLUMN     "mapInstanceId" TEXT;

-- DropTable
DROP TABLE "public"."_MapInstanceToPlayerInstance";

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_mapInstanceId_fkey" FOREIGN KEY ("mapInstanceId") REFERENCES "public"."MapInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
