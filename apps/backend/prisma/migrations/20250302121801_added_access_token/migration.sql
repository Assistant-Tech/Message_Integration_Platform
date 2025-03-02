/*
  Warnings:

  - You are about to drop the column `type` on the `payment_method` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userStatus` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_name]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,tenant_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_type` to the `payment_method` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organization_name` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SystemRoles" AS ENUM ('SUPER_ADMIN', 'TENANT_ADMIN', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "PermissionKey" AS ENUM ('MANAGE_TENANT', 'MANAGE_USERS', 'MANAGE_ROLES', 'VIEW_CONTENT', 'EDIT_OWN_PROFILE', 'MANAGE_BILLING', 'ASSIGN_MESSAGES', 'VIEW_ASSIGNED_MESSAGES', 'DELETE_MESSAGES');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tenantId_fkey";

-- DropIndex
DROP INDEX "payment_method_type_idx";

-- DropIndex
DROP INDEX "users_email_tenantId_key";

-- DropIndex
DROP INDEX "users_roleId_idx";

-- DropIndex
DROP INDEX "users_tenantId_idx";

-- AlterTable
ALTER TABLE "payment_method" DROP COLUMN "type",
ADD COLUMN     "payment_type" "PaymentType" NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "permissions",
DROP COLUMN "type",
ADD COLUMN     "type" "SystemRoles" NOT NULL;

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "name",
ADD COLUMN     "organization_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleId",
DROP COLUMN "tenantId",
DROP COLUMN "userStatus",
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" TEXT NOT NULL,
ADD COLUMN     "user_status" "UserStatus" NOT NULL DEFAULT 'ONLINE';

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" "PermissionKey" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "access_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE INDEX "role_permissions_role_id_permission_id_idx" ON "role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_token_key" ON "access_tokens"("token");

-- CreateIndex
CREATE INDEX "payment_method_payment_type_idx" ON "payment_method"("payment_type");

-- CreateIndex
CREATE UNIQUE INDEX "roles_type_key" ON "roles"("type");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_organization_name_key" ON "tenants"("organization_name");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "users"("tenant_id");

-- CreateIndex
CREATE INDEX "users_role_id_idx" ON "users"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_tenant_id_key" ON "users"("email", "tenant_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_tokens" ADD CONSTRAINT "access_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
