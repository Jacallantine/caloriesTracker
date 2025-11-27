-- CreateEnum
CREATE TYPE "public"."GameMode" AS ENUM ('SND', 'HP', 'CONTROL', 'OVERLOAD', 'DEFAULT');

-- AlterTable
ALTER TABLE "public"."PlayerInstance" ADD COLUMN     "gameMode" "public"."GameMode" NOT NULL DEFAULT 'DEFAULT';
