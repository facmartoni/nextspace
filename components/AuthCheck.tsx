"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function AuthCheck({ children }: Props) {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "authenticated") {
    return (
      <>
        <h1>AUTENTICADO 😲</h1>
        <h3>USTED ES {session.user?.name}</h3>
        <p>Se ve así</p>
        <img src={session.user?.image} alt="User image" style={{width: "80px"}} />
        {children}
      </>
    );
  } else {
    return <></>;
  }
}
