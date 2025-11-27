/*
  Warnings:

  - You are about to drop the `MapInstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerInstanceMapInstanceJoin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_mapId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerInstanceMapInstanceJoin" DROP CONSTRAINT "PlayerInstanceMapInstanceJoin_mapInstanceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerInstanceMapInstanceJoin" DROP CONSTRAINT "PlayerInstanceMapInstanceJoin_playerInstanceId_fkey";

-- AlterTable
ALTER TABLE "public"."PlayerInstance" ADD COLUMN     "isControl" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOverload" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSnd" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."MapInstance";

-- DropTable
DROP TABLE "public"."PlayerInstanceMapInstanceJoin";
