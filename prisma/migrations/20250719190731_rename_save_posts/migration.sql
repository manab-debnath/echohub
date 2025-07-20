/*
  Warnings:

  - You are about to drop the `SavePosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavePosts" DROP CONSTRAINT "SavePosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "SavePosts" DROP CONSTRAINT "SavePosts_userId_fkey";

-- DropTable
DROP TABLE "SavePosts";

-- CreateTable
CREATE TABLE "SavedPosts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "SavedPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
