/*
  Warnings:

  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DayToFoodBridge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Day" DROP CONSTRAINT "Day_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_dayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_foodId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Food" DROP CONSTRAINT "Food_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "public"."MapInstance" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'cb34920b-3031-4253-af93-dda57aa1bbab';

-- AlterTable
ALTER TABLE "public"."PlayerInstance" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'cb34920b-3031-4253-af93-dda57aa1bbab';

-- AlterTable
ALTER TABLE "public"."Team" ALTER COLUMN "userId" SET DEFAULT 'cb34920b-3031-4253-af93-dda57aa1bbab';

-- DropTable
DROP TABLE "public"."Day";

-- DropTable
DROP TABLE "public"."DayToFoodBridge";

-- DropTable
DROP TABLE "public"."Food";

-- DropTable
DROP TABLE "public"."Task";

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MapInstance" ADD CONSTRAINT "MapInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
