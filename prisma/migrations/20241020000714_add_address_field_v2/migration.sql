/*
  Warnings:

  - You are about to drop the column `inerTwo` on the `Address` table. All the data in the column will be lost.
  - Added the required column `lineTwo` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` DROP COLUMN `inerTwo`,
    ADD COLUMN `lineTwo` VARCHAR(191) NOT NULL;
