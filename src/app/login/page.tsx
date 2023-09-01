"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    const onLoginup = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success : ", response);
            router.push("/profile");
        } catch (error) {
            console.log("Error", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{isLoading ? "Processing..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onLoginup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "No login" : "Login"}
            </button>
            <Link href="/signup">Visit signup page</Link>
        </div>
    );
};

export default LoginPage;
