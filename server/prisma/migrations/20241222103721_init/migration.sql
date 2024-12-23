-- CreateTable
CREATE TABLE "theme" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
