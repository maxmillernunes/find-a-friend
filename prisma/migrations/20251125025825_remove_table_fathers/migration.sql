/*
  Warnings:

  - You are about to drop the `new_fathers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "new_fathers" DROP CONSTRAINT "new_fathers_pet_id_fkey";

-- DropTable
DROP TABLE "new_fathers";
