-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expiry_timestamp" SET DEFAULT NOW() + interval '24 hours';
