/*
  Warnings:

  - The primary key for the `theme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `theme` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `todos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `todos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `themeId` on the `todos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_themeId_fkey";

-- AlterTable
ALTER TABLE "theme" DROP CONSTRAINT "theme_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "theme_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "todos" DROP CONSTRAINT "todos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "themeId",
ADD COLUMN     "themeId" INTEGER NOT NULL,
ADD CONSTRAINT "todos_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
