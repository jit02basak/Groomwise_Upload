-- CreateTable
CREATE TABLE "Hairstyle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "faceShapes" TEXT[],
    "hairType" TEXT NOT NULL,
    "textureNotes" TEXT,

    CONSTRAINT "Hairstyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinProblem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SkinProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aboutText" TEXT NOT NULL,
    "problemIds" TEXT[],

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaceShapeCorrection" (
    "id" TEXT NOT NULL,
    "predictedShape" TEXT NOT NULL,
    "correctedShape" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "lengthToWidth" DOUBLE PRECISION NOT NULL,
    "jawToCheek" DOUBLE PRECISION NOT NULL,
    "browToCheek" DOUBLE PRECISION NOT NULL,
    "jawAngle" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FaceShapeCorrection_pkey" PRIMARY KEY ("id")
);
