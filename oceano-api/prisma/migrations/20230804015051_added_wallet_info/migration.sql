/*
  Warnings:

  - Added the required column `ewallet` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pkey` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ewallet" TEXT NOT NULL,
ADD COLUMN     "pkey" TEXT NOT NULL;
