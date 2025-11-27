/*
  Warnings:

  - The primary key for the `MapInstance` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_playerInstanceId_fkey";

-- AlterTable
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_pkey",
ADD CONSTRAINT "MapInstance_pkey" PRIMARY KEY ("mapInstanceId");

-- CreateTable
CREATE TABLE "public"."_MapInstanceToPlayerInstance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MapInstanceToPlayerInstance_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MapInstanceToPlayerInstance_B_index" ON "public"."_MapInstanceToPlayerInstance"("B");

-- AddForeignKey
ALTER TABLE "public"."_MapInstanceToPlayerInstance" ADD CONSTRAINT "_MapInstanceToPlayerInstance_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."MapInstance"("mapInstanceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MapInstanceToPlayerInstance" ADD CONSTRAINT "_MapInstanceToPlayerInstance_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."PlayerInstance"("playerInstanceId") ON DELETE CASCADE ON UPDATE CASCADE;
