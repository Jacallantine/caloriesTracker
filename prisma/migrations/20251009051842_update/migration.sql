/*
  Warnings:

  - The primary key for the `MapInstance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instanceId` on the `MapInstance` table. All the data in the column will be lost.
  - The primary key for the `PlayerInstance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instanceId` on the `PlayerInstance` table. All the data in the column will be lost.
  - The required column `mapInstanceId` was added to the `MapInstance` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `playerInstanceId` to the `MapInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapInstanceId` to the `PlayerInstance` table without a default value. This is not possible if the table is not empty.
  - The required column `playerInstanceId` was added to the `PlayerInstance` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."MapInstance" DROP CONSTRAINT "MapInstance_pkey",
DROP COLUMN "instanceId",
ADD COLUMN     "mapInstanceId" TEXT NOT NULL,
ADD COLUMN     "playerInstanceId" TEXT NOT NULL,
ADD CONSTRAINT "MapInstance_pkey" PRIMARY KEY ("mapInstanceId");

-- AlterTable
ALTER TABLE "public"."PlayerInstance" DROP CONSTRAINT "PlayerInstance_pkey",
DROP COLUMN "instanceId",
ADD COLUMN     "mapInstanceId" TEXT NOT NULL,
ADD COLUMN     "playerInstanceId" TEXT NOT NULL,
ADD CONSTRAINT "PlayerInstance_pkey" PRIMARY KEY ("playerInstanceId");

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_mapInstanceId_fkey" FOREIGN KEY ("mapInstanceId") REFERENCES "public"."MapInstance"("mapInstanceId") ON DELETE RESTRICT ON UPDATE CASCADE;
