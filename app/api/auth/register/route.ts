import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
        const {email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "email and password are required"},
                {status: 400}
            )
        }

        await connectToDatabase();
        const existingUser = await User.findOne({
            email: email
        })

        if(existingUser){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        await User.create({
            email,
            password,
            role: "user"
        })

        return NextResponse.json(
            {message: "User created successfully"},
            {status: 201}
        )

    } catch (error) {
        console.error("Registration Error", error);
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 501}
        )
    }
}