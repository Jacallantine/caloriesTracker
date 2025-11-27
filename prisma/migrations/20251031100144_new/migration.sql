/*
  Warnings:

  - You are about to drop the column `mapInstanceId` on the `PlayerInstance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PlayerInstance" DROP CONSTRAINT "PlayerInstance_mapInstanceId_fkey";

-- AlterTable
ALTER TABLE "public"."MapInstance" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."PlayerInstance" DROP COLUMN "mapInstanceId",
ALTER COLUMN "userId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."PlayerInstanceMapInstanceJoin" (
    "id" TEXT NOT NULL,
    "playerInstanceId" TEXT NOT NULL,
    "mapInstanceId" TEXT NOT NULL,

    CONSTRAINT "PlayerInstanceMapInstanceJoin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerInstanceMapInstanceJoin_mapInstanceId_idx" ON "public"."PlayerInstanceMapInstanceJoin"("mapInstanceId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerInstanceMapInstanceJoin_playerInstanceId_mapInstanceI_key" ON "public"."PlayerInstanceMapInstanceJoin"("playerInstanceId", "mapInstanceId");

-- AddForeignKey
ALTER TABLE "public"."PlayerInstanceMapInstanceJoin" ADD CONSTRAINT "PlayerInstanceMapInstanceJoin_playerInstanceId_fkey" FOREIGN KEY ("playerInstanceId") REFERENCES "public"."PlayerInstance"("playerInstanceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerInstanceMapInstanceJoin" ADD CONSTRAINT "PlayerInstanceMapInstanceJoin_mapInstanceId_fkey" FOREIGN KEY ("mapInstanceId") REFERENCES "public"."MapInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
