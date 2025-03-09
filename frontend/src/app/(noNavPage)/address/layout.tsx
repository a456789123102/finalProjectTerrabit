"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand";

function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { username } = useUserStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (username === undefined) {
            console.log(" Loading Zustand state...");
            return;
        }

        if (!username) {
            console.log("User not logged in. Redirecting...");
            const currentPath = encodeURIComponent(window.location.pathname);
            router.replace(`/login?redirect=${currentPath}`);
        } else {
            console.log(" rendering page.");
            setIsCheckingAuth(false);
        }
    }, [username, router]);


    if (isCheckingAuth) return <p>Loading...</p>;



    return (
        <div>
            {children}
        </div>
    );
}

export default Layout;
