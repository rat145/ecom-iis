import berlin from './berlin.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(berlin)
}