-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES');

-- CreateEnum
CREATE TYPE "DishType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SIDE');

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayMenu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "breakfastId" INTEGER,
    "lunchId" INTEGER,
    "dinnerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DayMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "mainDishId" INTEGER NOT NULL,
    "side1Id" INTEGER,
    "side2Id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT,
    "calories" INTEGER NOT NULL,
    "type" "DishType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DayMenu_breakfastId_key" ON "DayMenu"("breakfastId");

-- CreateIndex
CREATE UNIQUE INDEX "DayMenu_lunchId_key" ON "DayMenu"("lunchId");

-- CreateIndex
CREATE UNIQUE INDEX "DayMenu_dinnerId_key" ON "DayMenu"("dinnerId");

-- AddForeignKey
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_breakfastId_fkey" FOREIGN KEY ("breakfastId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_dinnerId_fkey" FOREIGN KEY ("dinnerId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mainDishId_fkey" FOREIGN KEY ("mainDishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_side1Id_fkey" FOREIGN KEY ("side1Id") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_side2Id_fkey" FOREIGN KEY ("side2Id") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
