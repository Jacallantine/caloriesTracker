-- CreateTable
CREATE TABLE "public"."MapInstance" (
    "instanceId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "isHp" BOOLEAN NOT NULL,
    "isControl" BOOLEAN NOT NULL,
    "isSnd" BOOLEAN NOT NULL,

    CONSTRAINT "MapInstance_pkey" PRIMARY KEY ("instanceId")
);

-- AddForeignKey
ALTER TABLE "public"."MapInstance" ADD CONSTRAINT "MapInstance_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."Map"("mapId") ON DELETE RESTRICT ON UPDATE CASCADE;
