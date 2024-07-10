"use client";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
    return (
        <span onClick={() => signOut()}>Log out</span>
    );
}