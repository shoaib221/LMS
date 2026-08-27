
import Stripe from "stripe";
const stripe = new Stripe(process.env['STRIPE_KEY']!);

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


export async function GET(req: Request) {

    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let pages = await prisma.transaction.count({
            where: {
                senderId: user.id,
                type: 'send'
            },
        })

        pages = Math.ceil( pages / limit )

        const transactions = await prisma.transaction.findMany({
            where: {
                senderId: user.id,
                type: 'send'
            },
            include: {
                receiver: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ data: transactions, pages }, { status: 200 });

    } catch (err) {
        console.error("Error fetching payment history:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }

}
