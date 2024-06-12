/*
  Warnings:

  - A unique constraint covering the columns `[customerId,ip]` on the table `Camera` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Camera_customerId_ip_key" ON "Camera"("customerId", "ip");
