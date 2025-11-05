/*
  Warnings:

  - A unique constraint covering the columns `[org_name]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orgs_org_name_key" ON "orgs"("org_name");
