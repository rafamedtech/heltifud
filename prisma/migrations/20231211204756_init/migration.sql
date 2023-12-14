/*
  Warnings:

  - You are about to drop the column `menuId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_courseId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "menuId";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "courseId",
ADD COLUMN     "breakfastDayId" TEXT,
ADD COLUMN     "dinnerDayId" TEXT,
ADD COLUMN     "lunchDayId" TEXT;

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Menu";

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_breakfastDayId_fkey" FOREIGN KEY ("breakfastDayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_lunchDayId_fkey" FOREIGN KEY ("lunchDayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dinnerDayId_fkey" FOREIGN KEY ("dinnerDayId") REFERENCES "Day"("id") ON DELETE SET NULL ON UPDATE CASCADE;
