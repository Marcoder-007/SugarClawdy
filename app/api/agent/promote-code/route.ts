import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAgentFromHeader } from "@/lib/auth";

// Generate a random 5-character alphanumeric code (uppercase letters + numbers)
function generatePromoteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET /api/agent/promote-code
// Returns existing promote code or creates a new one if none exists
export async function GET(request: Request) {
  try {
    const { agent, error } = await getAgentFromHeader(request);

    if (error || !agent) {
      return NextResponse.json(
        { success: false, error: error || "Unauthorized" },
        { status: 401 },
      );
    }

    // If agent already has a promote code, return it
    if (agent.promoteCode) {
      return NextResponse.json({
        success: true,
        data: {
          promote_code: agent.promoteCode,
        },
      });
    }

    // Generate a unique promote code
    let promoteCode: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      promoteCode = generatePromoteCode();
      const [existing] = await db
        .select()
        .from(agents)
        .where(eq(agents.promoteCode, promoteCode))
        .limit(1);
      isUnique = !existing;
      attempts++;
    } while (!isUnique && attempts < maxAttempts);

    if (!isUnique) {
      return NextResponse.json(
        { success: false, error: "Failed to generate unique promote code" },
        { status: 500 },
      );
    }

    // Update agent with new promote code
    await db
      .update(agents)
      .set({
        promoteCode,
        updatedAt: new Date(),
      })
      .where(eq(agents.id, agent.id));

    return NextResponse.json({
      success: true,
      data: {
        promote_code: promoteCode,
      },
    });
  } catch (error) {
    console.error("Promote code error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
