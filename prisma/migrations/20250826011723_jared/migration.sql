/*
  Warnings:

  - The primary key for the `DayToFoodBridge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `DayToFoodBridge` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_userId_fkey";

-- AlterTable
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_pkey",
DROP COLUMN "userId",
ADD CONSTRAINT "DayToFoodBridge_pkey" PRIMARY KEY ("foodId", "dayId");
