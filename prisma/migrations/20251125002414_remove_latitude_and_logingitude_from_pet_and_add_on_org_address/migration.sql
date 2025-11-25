/*
  Warnings:

  - You are about to drop the column `latitude` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `pets` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `org_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `org_address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org_address" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "latitude",
DROP COLUMN "longitude";
