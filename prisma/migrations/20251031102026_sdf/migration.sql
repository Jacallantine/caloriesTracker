/*
  Warnings:

  - Added the required column `userId` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Map" ADD COLUMN     "userId" TEXT NOT NULL;
