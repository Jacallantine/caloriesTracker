/*
  Warnings:

  - The values [premium] on the enum `PermissionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PermissionType_new" AS ENUM ('admin', 'ai', 'default');
ALTER TABLE "public"."UserPermission" ALTER COLUMN "permissionId" TYPE "public"."PermissionType_new" USING ("permissionId"::text::"public"."PermissionType_new");
ALTER TYPE "public"."PermissionType" RENAME TO "PermissionType_old";
ALTER TYPE "public"."PermissionType_new" RENAME TO "PermissionType";
DROP TYPE "public"."PermissionType_old";
COMMIT;
