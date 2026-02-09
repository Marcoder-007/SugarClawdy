import { NextResponse } from "next/server";
import { getAgentFromHeader } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { agent, error } = await getAgentFromHeader(request);

    if (error || !agent) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: agent.id,
        name: agent.name,
        wallet_address: agent.walletAddress,
        solana_address: agent.solanaAddress,
        promote_code: agent.promoteCode,
        created_at: agent.createdAt,
      },
    });
  } catch (error) {
    console.error("Get agent info error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
