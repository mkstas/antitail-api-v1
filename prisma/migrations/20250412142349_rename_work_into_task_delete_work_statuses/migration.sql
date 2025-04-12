/*
  Warnings:

  - You are about to drop the column `is_done` on the `subtasks` table. All the data in the column will be lost.
  - You are about to drop the column `work_id` on the `subtasks` table. All the data in the column will be lost.
  - You are about to drop the `work_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `works` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `task_id` to the `subtasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subtasks" DROP CONSTRAINT "subtasks_work_id_fkey";

-- DropForeignKey
ALTER TABLE "work_types" DROP CONSTRAINT "work_types_user_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_user_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_work_status_id_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_work_type_id_fkey";

-- AlterTable
ALTER TABLE "subtasks" DROP COLUMN "is_done",
DROP COLUMN "work_id",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "task_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "work_statuses";

-- DropTable
DROP TABLE "work_types";

-- DropTable
DROP TABLE "works";

-- CreateTable
CREATE TABLE "task_types" (
    "task_type_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_types_pkey" PRIMARY KEY ("task_type_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "task_type_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "task_types" ADD CONSTRAINT "task_types_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_type_id_fkey" FOREIGN KEY ("task_type_id") REFERENCES "task_types"("task_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
