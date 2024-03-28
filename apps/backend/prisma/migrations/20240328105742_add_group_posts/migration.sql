/*
  Warnings:

  - You are about to drop the column `user_subscriptions` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiry_timestamp" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_subscriptions";

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" VARCHAR(20),
    "last_name" VARCHAR(20),
    "age" INTEGER,
    "nationality" VARCHAR(20),

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPost" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "body" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnGroupPost" (
    "user_id" INTEGER NOT NULL,
    "group_post_id" INTEGER NOT NULL,

    CONSTRAINT "UserOnGroupPost_pkey" PRIMARY KEY ("user_id","group_post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_user_id_key" ON "PersonalData"("user_id");

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnGroupPost" ADD CONSTRAINT "UserOnGroupPost_group_post_id_fkey" FOREIGN KEY ("group_post_id") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnGroupPost" ADD CONSTRAINT "UserOnGroupPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
