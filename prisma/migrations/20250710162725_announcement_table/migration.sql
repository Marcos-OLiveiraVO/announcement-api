-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('email', 'slack', 'teams');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'sent');

-- CreateTable
CREATE TABLE "announcement" (
    "id" SERIAL NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" VARCHAR(5000) NOT NULL,
    "channel_type" "ChannelType" NOT NULL,
    "status" "Status" NOT NULL,
    "sent_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "announcement_author_idx" ON "announcement"("author");

-- CreateIndex
CREATE INDEX "announcement_title_idx" ON "announcement"("title");

-- CreateIndex
CREATE INDEX "announcement_channel_type_idx" ON "announcement"("channel_type");

-- CreateIndex
CREATE INDEX "announcement_status_idx" ON "announcement"("status");
