"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApiResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export default function TestApiPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [solanaAddress, setSolanaAddress] = useState("");
  const [name, setName] = useState("");
  const [authWallet, setAuthWallet] = useState("");
  const [results, setResults] = useState<
    { endpoint: string; response: ApiResponse | null; status: number }[]
  >([]);
  const [loading, setLoading] = useState<string | null>(null);

  const addResult = (
    endpoint: string,
    response: ApiResponse | null,
    status: number,
  ) => {
    setResults((prev) => [{ endpoint, response, status }, ...prev]);
  };

  const testRegister = async () => {
    setLoading("register");
    try {
      const res = await fetch("/api/agent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress,
          solana_address: solanaAddress || undefined,
          name,
        }),
      });
      const data = await res.json();
      addResult("POST /api/agent/register", data, res.status);
      if (data.success) {
        setAuthWallet(walletAddress);
      }
    } catch (error) {
      addResult(
        "POST /api/agent/register",
        { success: false, error: String(error) },
        500,
      );
    }
    setLoading(null);
  };

  const testGetMe = async () => {
    setLoading("me");
    try {
      const res = await fetch("/api/agent/me", {
        headers: { Authorization: `Bearer ${authWallet}` },
      });
      const data = await res.json();
      addResult("GET /api/agent/me", data, res.status);
    } catch (error) {
      addResult(
        "GET /api/agent/me",
        { success: false, error: String(error) },
        500,
      );
    }
    setLoading(null);
  };

  const testGetPromoteCode = async () => {
    setLoading("promote-get");
    try {
      const res = await fetch("/api/agent/promote-code", {
        headers: { Authorization: `Bearer ${authWallet}` },
      });
      const data = await res.json();
      addResult("GET /api/agent/promote-code", data, res.status);
    } catch (error) {
      addResult(
        "GET /api/agent/promote-code",
        { success: false, error: String(error) },
        500,
      );
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8">API Test Page</h1>

        {/* Register Test */}
        <Card className="bg-card-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">1. Register Agent</CardTitle>
            <CardDescription>POST /api/agent/register</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="EVM Wallet Address (e.g., 0x123...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Input
                placeholder="Agent Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Input
              placeholder="Solana Wallet Address (optional, e.g., 7xKXtg...)"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button
              onClick={testRegister}
              disabled={loading === "register" || !walletAddress || !name}
            >
              {loading === "register" ? "Testing..." : "Test Register"}
            </Button>
          </CardContent>
        </Card>

        {/* Auth Header */}
        <Card className="bg-card-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">Authorization Header</CardTitle>
            <CardDescription>
              Set EVM or Solana wallet for Bearer token authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="EVM or Solana Wallet Address for Auth"
              value={authWallet}
              onChange={(e) => setAuthWallet(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <p className="text-xs text-slate-400 mt-2">
              Header: Authorization: Bearer {authWallet || "<wallet>"}
            </p>
          </CardContent>
        </Card>

        {/* Get Me Test */}
        <Card className="bg-card-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">2. Get Agent Info</CardTitle>
            <CardDescription>GET /api/agent/me (requires auth)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testGetMe}
              disabled={loading === "me" || !authWallet}
            >
              {loading === "me" ? "Testing..." : "Test Get Me"}
            </Button>
          </CardContent>
        </Card>

        {/* Promote Code Tests */}
        <Card className="bg-card-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">3. Promote Code</CardTitle>
            <CardDescription>
              GET /api/agent/promote-code (requires auth) - creates or retrieves
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testGetPromoteCode}
              disabled={loading === "promote-get" || !authWallet}
            >
              {loading === "promote-get"
                ? "Testing..."
                : "GET (Create or Retrieve)"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-card-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-white">Results</CardTitle>
            <CardDescription>API responses will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <p className="text-slate-400">No tests run yet</p>
            ) : (
              <div className="space-y-4">
                {results.map((result, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-slate-800 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-white">
                        {result.endpoint}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          result.status >= 200 && result.status < 300
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                    <pre className="text-xs text-slate-300 overflow-x-auto">
                      {JSON.stringify(result.response, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
