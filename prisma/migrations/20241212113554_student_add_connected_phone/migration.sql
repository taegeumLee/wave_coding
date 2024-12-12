/*
  Warnings:

  - Added the required column `phone` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Student" ("createdAt", "email", "id", "name", "updatedAt") SELECT "createdAt", "email", "id", "name", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
