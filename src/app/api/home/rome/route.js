import rome from './rome.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(rome)
}