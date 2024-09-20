import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  // ⚠️ We grab the email server side, because if we do it
  // client side a hacker could modify it and damage other
  // user account
  const currentUserEmail = session?.user?.email!;

  const data = await req.json();

  // We cast the age because .json() returns a string and
  // the DB expects a number
  data.age = Number(data.age);

  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });

  return NextResponse.json(user);
}
