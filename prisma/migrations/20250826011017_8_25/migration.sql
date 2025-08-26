/*
  Warnings:

  - The primary key for the `DayToFoodBridge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,date]` on the table `Day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DayToFoodBridge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Day" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."DayToFoodBridge" DROP CONSTRAINT "DayToFoodBridge_pkey",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "DayToFoodBridge_pkey" PRIMARY KEY ("foodId", "dayId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Day_userId_date_key" ON "public"."Day"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."Day" ADD CONSTRAINT "Day_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayToFoodBridge" ADD CONSTRAINT "DayToFoodBridge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
