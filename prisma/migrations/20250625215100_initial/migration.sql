-- CreateTable
CREATE TABLE "phones" (
    "phone_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("phone_id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "subject_id" TEXT NOT NULL,
    "phone_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "task_types" (
    "task_type_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_types_pkey" PRIMARY KEY ("task_type_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" TEXT NOT NULL,
    "task_type_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "subtask_id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("subtask_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phones_phone_number_key" ON "phones"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_title_key" ON "subjects"("title");

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones"("phone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_types" ADD CONSTRAINT "task_types_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_type_id_fkey" FOREIGN KEY ("task_type_id") REFERENCES "task_types"("task_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
