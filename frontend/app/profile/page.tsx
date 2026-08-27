"use client"

import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useMyImage } from "@/library/Media/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button1 } from "@/library/button/button1";
import "@/library/button/button1.css";
import { toast } from "react-toastify";
import { IoExit, IoExitOutline } from "react-icons/io5";


export default function UpdateProfile() {
    const { myProfile } = useAuthContext();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const { PhotoTag, uploadPhoto, resetPhoto } = useMyImage({ url: myProfile?.image || "" });

    async function UpdateProfile(data: any) {
        try {
            let image = await uploadPhoto();
            const response = await axios.post("/api/profile", {
                name: data.name,
                image: image || myProfile?.image || "",
            });
            console.log("Profile updated:", response.data);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Sorry! Something is wrong")
        }
    }

    useEffect(() => {
        if (myProfile) {
            reset({
                email: myProfile.email,
                name: myProfile.name,
            });

            resetPhoto(myProfile.image);
        }
    }, [myProfile]);

    return (
        <div className="flex flex-col lg:flex-row grow relative mx-auto gap-16 p-8" >
            <div>


                <div className="lg:sticky lg:top-2 self-start" >
                    <PhotoTag />
                </div>
                <br />



            </div>

            <div>



                {/* Name */}
                <div>
                    <label className="header-3">Name</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        })}
                        className="input1 w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name?.message?.toString()}</p>
                    )}
                </div>

                <br />

                {/* Bio */}
                <div>
                    <label className="header-3">Bio</label>
                    <textarea
                        {...register("bio", {
                            
                           
                        })}
                        className="w-full input1"
                        rows={4}
                    />
                    {errors.bio && (
                        <p className="text-red-500 text-sm">{errors.bio?.message?.toString()}</p>
                    )}
                </div>

                <br />

                {/* Location */}
                <div>
                    <label className="header-3">Location</label>
                    <input
                        type="text"
                        {...register("location", {
                            
                        })}
                        className="w-full input1"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location?.message?.toString()}</p>
                    )}
                </div>

                <br />


                {/* Contact */}
                <div>
                    <label className="header-3">Contact</label>
                    <input
                        type="text"
                        {...register("contact", {
                            
                        })}
                        className="w-full input1"
                    />
                    {errors.contact && (
                        <p className="text-red-500 text-sm">{errors.contact?.message?.toString()}</p>
                    )}
                </div>

                <br />

                

                <button className="button-2" onClick={handleSubmit(UpdateProfile)}  >
                    Update
                </button>

                <br /> <br />

                <div className="grid grid-cols-[1fr_2fr] gap-4 p-2" >
                    <div className="font-bold text-(--color3)" >Role: </div>
                    <div> {myProfile?.role} </div>

                    <div className="font-bold text-(--color3)" >Coins Available: </div>
                    <div>{myProfile?.coins}</div>

                    <div className="font-bold text-(--color3)" >User ID: </div>
                    <div> {myProfile?.email} </div>
                </div>

                <br />

                <button className="button-2 flex justify-between items-center gap-4" style={{ backgroundColor: 'var(--color6)', color: 'white' }} onClick={() => signOut()} >
                    Sign Out

                </button>

            </div>

        </div>

    )
}
