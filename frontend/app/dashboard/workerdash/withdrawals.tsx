"use client"

import { useAuthContext } from "@/library/auth/context";
import { useConfirmer } from "@/library/miscel/confirmer";
import { DateDisplay } from "@/library/miscel/date";
import { usePagination1 } from "@/library/miscel/pagination";
import { Transaction } from "@/prisma/generated/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export function Withdrawals() {
    const { myProfile } = useAuthContext();
    const [amount, setAmount] = useState<number>(0);
    const [acno, setAcno] = useState("");
    const { data, PageTag } = usePagination1<Transaction>({ url: '/api/withdrawals' });
    const { Tag: WithdrawTag, procede: WithdrawProcede, Init: WithdrawInit, resetProcede } = useConfirmer({ message: `Are you sure you want to proceed with this withdrawal?` });





    useEffect(() => {
        if (!WithdrawProcede) return;

        async function handleOnboard() {

            if (typeof amount !== "number" || amount < 1) {
                toast.error("Please enter a valid amount to withdraw")
                return;
            }

            console.log("onboard")

            try {
                const response = await axios.post("/api/payment/stripe/onboard", { amount });
                const { url } = response.data;
                setAmount(0);
                resetProcede();

                if (url) {
                    toast.info("Please setup your connected account");
                    window.location.href = url;
                } else {
                    toast.success("Withdrawal request placed");
                }



            } catch (error) {
                console.error("Error initiating Stripe onboarding:", error);
            }
        }

        handleOnboard();

    }, [WithdrawProcede])

    return (
        <div className="grow p-4" >
            <WithdrawTag />
            <br />


            <div className="header-1" >Application For Withdrawal</div>
            <br />

            

            <div className="mx-auto w-full max-w-[600px] flex flex-col items-center" >

                <div className="grid gap-4 grid-cols-[10rem_1fr] w-full" >

                    <div className="font-bold" > Available Coins </div>
                    <div> {myProfile?.coins}</div>


                    <div className="font-bold" > Payment System :</div>
                    <select className="bg-(--color3) text-(--color1) p-2 rounded-lg" >
                        <option>Select</option>
                        <option>Stripe</option>
                    </select>

                    <div className="font-bold" >
                        Coin to Withdraw
                    </div>

                    <div>
                        <input type="number" placeholder="How much to withdraw..." className="p-2 input1"
                            value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                        <div> {amount / 20} BDT to Withdraw</div>
                    </div>


                </div>


                <br />

                

                {myProfile?.coins && myProfile?.coins >= amount ? <button className="button-2" onClick={WithdrawInit} >
                    Submit
                </button> : <button disabled className="text-(--color6) font-bold" >
                    Insufficient Coins
                </button>}



            </div>

            <div className="h-20 w-full" ></div>

            <div className="header-1" >Withdrawal History</div>



            <div className="flex flex-col gap-4 p-4" >
                {data && data.map(elem => (
                    <div key={elem.id} className="box-15 grid grid-cols-[8rem_1fr] gap-2 px-16" >
                        <div className="font-bold" >  Amount :     </div>
                        <div className="font-bold" > {elem.amount} Coins </div>

                        <div>Requested at : </div>
                        <DateDisplay date={elem.createdAt} /> 
                        
                        <div>Status : </div>
                        <div> {elem.status} </div>                         

                    </div>
                ))}
            </div>

            <PageTag />

        </div>
    )
}

