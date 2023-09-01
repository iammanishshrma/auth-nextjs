"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState("nothing");
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setUser(res.data.data._id);
    };
    useEffect(() => {
        getUserDetails();
    }, []);
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-green-500">
                {user === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${user}`}>{user}</Link>
                )}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
