-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_themeId_fkey";

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
