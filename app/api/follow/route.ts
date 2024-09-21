import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Used when a User follows another User
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const { targetUserId } = await req.json();

  // By default the session won't give us the User id, so
  // we can fetch it from the database
  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // Create a new record to represent the relationship
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}
// Used when a User unfollows another User
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  // We grab the target User ID from the URL because we don't
  // have a json available like in the previous method, that
  // was a POST onw
  const targetUserId = req.nextUrl.searchParams.get("targetUserId")!;

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  return NextResponse.json(record);
}
