-- CreateTable
CREATE TABLE "SpendControll" (
    "spendControllId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendControll_pkey" PRIMARY KEY ("spendControllId")
);

-- CreateTable
CREATE TABLE "SpendControllUsers" (
    "spendControllId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendControllUsers_pkey" PRIMARY KEY ("spendControllId","userId")
);

-- CreateTable
CREATE TABLE "Spend" (
    "spendId" TEXT NOT NULL,
    "spendControllId" TEXT NOT NULL,
    "spendCategoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spend_pkey" PRIMARY KEY ("spendId")
);

-- CreateTable
CREATE TABLE "SpendCategory" (
    "spendCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendCategory_pkey" PRIMARY KEY ("spendCategoryId")
);

-- AddForeignKey
ALTER TABLE "SpendControllUsers" ADD CONSTRAINT "SpendControllUsers_spendControllId_fkey" FOREIGN KEY ("spendControllId") REFERENCES "SpendControll"("spendControllId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendControllUsers" ADD CONSTRAINT "SpendControllUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spend" ADD CONSTRAINT "Spend_spendControllId_fkey" FOREIGN KEY ("spendControllId") REFERENCES "SpendControll"("spendControllId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spend" ADD CONSTRAINT "Spend_spendCategoryId_fkey" FOREIGN KEY ("spendCategoryId") REFERENCES "SpendCategory"("spendCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spend" ADD CONSTRAINT "Spend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
