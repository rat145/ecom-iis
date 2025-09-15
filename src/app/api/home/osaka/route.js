import osaka from './osaka.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(osaka)
}