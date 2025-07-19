import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const internId = searchParams.get("internId");
    const email = searchParams.get("email");

    let certificates;
    if (internId) {
      certificates = await prisma.certificate.findMany({ where: { internId } });
    } else if (email) {
      certificates = await prisma.certificate.findMany({ where: { email } });
    } else {
      certificates = await prisma.certificate.findMany();
    }

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("[API][GET /api/certificates] Error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const certificate = await prisma.certificate.update({ where: { id }, data });
    return NextResponse.json(certificate);
  } catch (error) {
    console.error("[API][PUT /api/certificates/[id]] Error:", error);
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API][DELETE /api/certificates/[id]] Error:", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
} 