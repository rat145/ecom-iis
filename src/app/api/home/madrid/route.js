import madrid from './madrid.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(madrid)
}