-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Staged', 'Active', 'Locked');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'Staged',
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
