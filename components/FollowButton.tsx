import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession();

  const currentUserEmail = session?.user?.email!;

  const currentUserId = await prisma.user
    .findUnique({
      where: { email: currentUserEmail },
    })
    .then((user) => user?.id!);

  const isFollowing = await prisma.follows.findFirst({
    where: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
