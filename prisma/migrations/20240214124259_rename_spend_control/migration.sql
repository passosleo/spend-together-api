/*
  Warnings:

  - You are about to drop the column `spendControllId` on the `Spend` table. All the data in the column will be lost.
  - You are about to drop the `SpendControll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpendControllUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `spendControlId` to the `Spend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Spend" DROP CONSTRAINT "Spend_spendControllId_fkey";

-- DropForeignKey
ALTER TABLE "SpendControllUsers" DROP CONSTRAINT "SpendControllUsers_spendControllId_fkey";

-- DropForeignKey
ALTER TABLE "SpendControllUsers" DROP CONSTRAINT "SpendControllUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Spend" DROP COLUMN "spendControllId",
ADD COLUMN     "spendControlId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isPublic" SET DEFAULT true;

-- DropTable
DROP TABLE "SpendControll";

-- DropTable
DROP TABLE "SpendControllUsers";

-- CreateTable
CREATE TABLE "SpendControl" (
    "spendControlId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendControl_pkey" PRIMARY KEY ("spendControlId")
);

-- CreateTable
CREATE TABLE "SpendControlUsers" (
    "spendControlId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendControlUsers_pkey" PRIMARY KEY ("spendControlId","userId")
);

-- AddForeignKey
ALTER TABLE "SpendControlUsers" ADD CONSTRAINT "SpendControlUsers_spendControlId_fkey" FOREIGN KEY ("spendControlId") REFERENCES "SpendControl"("spendControlId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendControlUsers" ADD CONSTRAINT "SpendControlUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spend" ADD CONSTRAINT "Spend_spendControlId_fkey" FOREIGN KEY ("spendControlId") REFERENCES "SpendControl"("spendControlId") ON DELETE RESTRICT ON UPDATE CASCADE;
