import { getCurrent } from "@/features/auth/queries";
import { SigninCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";
import React from "react";

const SigninPage = async () => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <SigninCard />;
};

export default SigninPage;
