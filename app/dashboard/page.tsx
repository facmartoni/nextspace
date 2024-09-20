import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const currentUserEmail = session?.user?.email!;

  if (!currentUserEmail) {
    // Manejar el caso en que no hay email
    console.error("No se pudo obtener el email del usuario. Sesión:", session);
    return (
      <div>
        Error: No se pudo obtener el email del usuario. Por favor, asegúrate de
        que has concedido permisos de email a la aplicación en GitHub.
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  return (
    <>
      <h1>Dashboard</h1>
      <ProfileForm user={user} />
    </>
  );
}
