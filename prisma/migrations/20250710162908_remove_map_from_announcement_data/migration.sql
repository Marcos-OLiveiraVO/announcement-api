/*
  Warnings:

  - You are about to drop the column `created_at` on the `announcement` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `announcement` table. All the data in the column will be lost.
  - You are about to drop the column `sent_at` on the `announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "announcement" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "sent_at",
ADD COLUMN     "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP,
ADD COLUMN     "sentAt" TIMESTAMP;
