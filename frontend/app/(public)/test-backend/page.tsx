"use client";

import Link from "next/link";
import { useState } from "react";

import api from "@/lib/axios";



export default function Page() {



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.get("/");



            console.log(
                "Test successful:",
                response
            );

            alert("Data fetched successfully")

        }
        catch (error: any) {
            console.dir(error);

            const err = error as {
                response?: {
                    data?: {
                        error?: {
                            message?: string;
                        };
                        message?: string;
                    };
                };
                message?: string;
            };



            const message =
                err.response?.data?.error?.message ??
                err.response?.data?.message ??
                err.message ??
                "Login failed";

            console.error("Login failed:", message);
            alert("Test failed")


        }
    };

    return (
        <div className="flex items-center justify-center text-black" >
            <button onClick={handleSubmit} >
                Fetch Data From Api
            </button>
        </div>
    )
}