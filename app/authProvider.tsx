"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface LayoutProviderProps {
    children: React.ReactNode;
    session: Session | null;
  }
const AuthProvider = ({children}:LayoutProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
