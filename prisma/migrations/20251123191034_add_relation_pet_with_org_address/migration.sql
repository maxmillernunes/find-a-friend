/*
  Warnings:

  - Added the required column `org_address_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "org_address_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_address_id_fkey" FOREIGN KEY ("org_address_id") REFERENCES "org_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
