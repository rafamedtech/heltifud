/*
  Warnings:

  - The primary key for the `Meal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `breakfastDayId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `dinnerDayId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `lunchDayId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Meal` table. All the data in the column will be lost.
  - The `id` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mainDishId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateEnum
CREATE TYPE "DishType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_breakfastDayId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dinnerDayId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_lunchDayId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_pkey",
DROP COLUMN "breakfastDayId",
DROP COLUMN "calories",
DROP COLUMN "dinnerDayId",
DROP COLUMN "lunchDayId",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "mainDishId" INTEGER NOT NULL,
ADD COLUMN     "side1Id" INTEGER,
ADD COLUMN     "side2Id" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Meal_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Day";

-- DropTable
DROP TABLE "Expense";

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekMenu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "breakfastId" INTEGER,
    "lunchId" INTEGER,
    "dinnerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeekMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "type" "DishType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekMenu_breakfastId_key" ON "WeekMenu"("breakfastId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekMenu_lunchId_key" ON "WeekMenu"("lunchId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekMenu_dinnerId_key" ON "WeekMenu"("dinnerId");

-- AddForeignKey
ALTER TABLE "WeekMenu" ADD CONSTRAINT "WeekMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekMenu" ADD CONSTRAINT "WeekMenu_breakfastId_fkey" FOREIGN KEY ("breakfastId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekMenu" ADD CONSTRAINT "WeekMenu_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekMenu" ADD CONSTRAINT "WeekMenu_dinnerId_fkey" FOREIGN KEY ("dinnerId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mainDishId_fkey" FOREIGN KEY ("mainDishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_side1Id_fkey" FOREIGN KEY ("side1Id") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_side2Id_fkey" FOREIGN KEY ("side2Id") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
