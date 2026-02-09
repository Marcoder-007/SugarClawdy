import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export async function getAgentFromHeader(
  request: Request,
): Promise<{ agent: typeof agents.$inferSelect | null; error: string | null }> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { agent: null, error: "Missing or invalid Authorization header" };
  }

  const walletAddress = authHeader.replace("Bearer ", "").trim();

  if (!walletAddress) {
    return { agent: null, error: "Wallet address is required" };
  }

  // Look up agent by either EVM wallet address or Solana wallet address
  const [agent] = await db
    .select()
    .from(agents)
    .where(
      or(
        eq(agents.walletAddress, walletAddress),
        eq(agents.solanaAddress, walletAddress),
      ),
    )
    .limit(1);

  if (!agent) {
    return { agent: null, error: "Agent not found" };
  }

  return { agent, error: null };
}
