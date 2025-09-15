import blog from './blog.json'
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(blog)
}