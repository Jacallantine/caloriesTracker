-- CreateTable
CREATE TABLE "public"."Map" (
    "mapId" TEXT NOT NULL,
    "mapName" TEXT NOT NULL,
    "isHp" BOOLEAN NOT NULL,
    "isSnd" BOOLEAN NOT NULL,
    "isControl" BOOLEAN NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("mapId")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "public"."Player" (
    "playerId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "public"."PlayerInstance" (
    "instanceId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "hillTime" INTEGER NOT NULL,
    "plants" INTEGER NOT NULL,
    "defuses" INTEGER NOT NULL,
    "isAR" BOOLEAN NOT NULL,
    "isSub" BOOLEAN NOT NULL,
    "isFlex" BOOLEAN NOT NULL,
    "controlTicks" INTEGER NOT NULL,

    CONSTRAINT "PlayerInstance_pkey" PRIMARY KEY ("instanceId")
);

-- CreateTable
CREATE TABLE "public"."_PlayerToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlayerToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlayerToTeam_B_index" ON "public"."_PlayerToTeam"("B");

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerInstance" ADD CONSTRAINT "PlayerInstance_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."Map"("mapId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Player"("playerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PlayerToTeam" ADD CONSTRAINT "_PlayerToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;
