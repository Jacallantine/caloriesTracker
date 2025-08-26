-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Food" (
    "foodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("foodId")
);

-- CreateTable
CREATE TABLE "public"."Day" (
    "dayId" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("dayId")
);

-- CreateTable
CREATE TABLE "public"."DayToFoodBridge" (
    "foodId" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,

    CONSTRAINT "DayToFoodBridge_pkey" PRIMARY KEY ("foodId","dayId")
);

-- AddForeignKey
ALTER TABLE "public"."Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayToFoodBridge" ADD CONSTRAINT "DayToFoodBridge_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("foodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayToFoodBridge" ADD CONSTRAINT "DayToFoodBridge_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("dayId") ON DELETE RESTRICT ON UPDATE CASCADE;
