import denver from './denver.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(denver)
}