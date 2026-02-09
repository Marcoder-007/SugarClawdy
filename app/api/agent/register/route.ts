import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wallet_address, solana_address, name } = body;

    // Validate required fields
    if (!wallet_address || typeof wallet_address !== "string") {
      return NextResponse.json(
        { success: false, error: "wallet_address is required" },
        { status: 400 },
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { success: false, error: "name is required" },
        { status: 400 },
      );
    }

    // Validate solana_address type if provided
    if (
      solana_address !== undefined &&
      solana_address !== null &&
      typeof solana_address !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "solana_address must be a string" },
        { status: 400 },
      );
    }

    // Check if EVM wallet already exists
    const [existingByEvm] = await db
      .select()
      .from(agents)
      .where(eq(agents.walletAddress, wallet_address))
      .limit(1);
    if (existingByEvm) {
      return NextResponse.json(
        { success: false, error: "EVM wallet address already registered" },
        { status: 409 },
      );
    }

    // Check if Solana wallet already exists (if provided)
    if (solana_address) {
      const [existingBySolana] = await db
        .select()
        .from(agents)
        .where(eq(agents.solanaAddress, solana_address))
        .limit(1);
      if (existingBySolana) {
        return NextResponse.json(
          { success: false, error: "Solana wallet address already registered" },
          { status: 409 },
        );
      }
    }

    // Create new agent
    const [newAgent] = await db
      .insert(agents)
      .values({
        walletAddress: wallet_address,
        solanaAddress: solana_address || null,
        name: name.trim(),
      })
      .returning({ id: agents.id });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newAgent.id,
          message: "Agent registered successfully",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
