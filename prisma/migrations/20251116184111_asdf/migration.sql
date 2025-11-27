/*
  Warnings:

  - You are about to drop the column `permissionId` on the `UserPermission` table. All the data in the column will be lost.
  - Added the required column `permission` to the `UserPermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserPermission" DROP COLUMN "permissionId",
ADD COLUMN     "permission" "public"."PermissionType" NOT NULL;
