import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"



export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany();
    return NextResponse.json(certificates);
  } catch (error) {
    console.error("[API][GET /api/certificates] Error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const certificate = await prisma.certificate.create({ data });
    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("[API][POST /api/certificates] Error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
} 