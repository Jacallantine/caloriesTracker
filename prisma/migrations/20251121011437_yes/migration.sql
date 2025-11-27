/*
  Warnings:

  - Added the required column `isOverload` to the `MapInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MapInstance" ADD COLUMN     "isOverload" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "public"."Team" ALTER COLUMN "userId" SET DEFAULT '';
