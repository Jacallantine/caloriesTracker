/*
  Warnings:

  - The primary key for the `MapInstance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mapInstanceId` on the `PlayerInstance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PlayerInstance" DROP CONSTRAINT "PlayerInstance_mapInstanceId_fkey";

-- AlterTable
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_pkey",
ADD CONSTRAINT "MapInstance_pkey" PRIMARY KEY ("mapInstanceId", "playerInstanceId");

-- AlterTable
ALTER TABLE "public"."PlayerInstance" DROP COLUMN "mapInstanceId";

-- AddForeignKey
ALTER TABLE "public"."MapInstance" ADD CONSTRAINT "MapInstance_playerInstanceId_fkey" FOREIGN KEY ("playerInstanceId") REFERENCES "public"."PlayerInstance"("playerInstanceId") ON DELETE RESTRICT ON UPDATE CASCADE;
