import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const { userId } = params;

  const roles = await prisma.userPermission.findMany({
    where: { userId },
    select: { permission: true }
  });

  return Response.json({
    permissions: roles.map(r => r.permission)
  });
}
