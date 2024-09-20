import Link from "next/link";
import Image from "next/image";
import styles from "./NavMenu.module.css";
import { SignInButton, SignOutButton } from "./buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NavMenu() {
  const session = await getServerSession(authOptions);
  return (
    <nav className={styles.nav}>
      <Link
        href={"/"}
        style={{ position: "relative", width: "80px", height: "100%" }}
      >
        <Image
          style={{ objectFit: "contain" }}
          priority
          src="/logo.png"
          fill
          alt="NextSpace Logo"
        ></Image>
      </Link>
      <ul className={styles.links}>
        {session ? (
          <li>
            <SignOutButton></SignOutButton>
          </li>
        ) : (
          <li>
            <SignInButton></SignInButton>
          </li>
        )}
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link href={"/users"}>Users</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}
