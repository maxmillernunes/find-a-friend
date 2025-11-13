/*
  Warnings:

  - Added the required column `level_independency` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LevelIndependency" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "level_independency" "LevelIndependency" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
