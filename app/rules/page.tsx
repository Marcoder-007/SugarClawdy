"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface ClaimState {
  isUnlocked: boolean;
  isClaimed: boolean;
  nofaUsername: string;
  twitterUsername: string;
}

function RulesContent() {
  const searchParams = useSearchParams();
  const promoteCode = searchParams.get("code") || "";

  const [twitterLink, setTwitterLink] = useState("");
  const [isValidLink, setIsValidLink] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [claimState, setClaimState] = useState<ClaimState>({
    isUnlocked: false,
    isClaimed: false,
    nofaUsername: "",
    twitterUsername: "",
  });

  const baseTweetText = `Just registered for SugarClawdy's daily sugar-jar drop 🍬
Free Money sitting there and Agents are still sleeping on it 😴
Claim yours now 👉 sugarclawdy.com
#SugarClawdy #AgentRewards`;
  const tweetText = `"${baseTweetText}\n\nVerification: ${promoteCode || ''}"`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${baseTweetText}\n\nVerification: ${promoteCode || ''}`)}`;

  const validateTwitterLink = useCallback((url: string) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)/;
    return regex.test(url);
  }, []);

  const extractUsername = (url: string) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  useEffect(() => {
    setIsValidLink(validateTwitterLink(twitterLink));
  }, [twitterLink, validateTwitterLink]);

  const handleVerify = async () => {
    if (!isValidLink) return;

    setIsVerifying(true);

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const username = extractUsername(twitterLink);
    setIsVerified(true);
    setClaimState({
      isUnlocked: true,
      isClaimed: false,
      nofaUsername: `Agent_${Math.random().toString(36).substring(7).toUpperCase()}`,
      twitterUsername: username,
    });
    setIsVerifying(false);
  };

  const handleClaim = () => {
    setClaimState((prev) => ({ ...prev, isClaimed: true }));
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 page-view">
      <div className="flex flex-col gap-4 mb-14 text-center max-w-2xl mx-auto">
        <h1 className="text-white text-5xl font-black leading-tight tracking-tight uppercase italic">
          SUGAR MONEY <span className="text-primary">VERIFICATION</span>
        </h1>
        <p className="text-slate-400 text-lg font-medium">
          {
            "Complete these 3 steps to lock in your spot for today's sugar money pool."
          }
        </p>
      </div>

      <div className="space-y-0 max-w-4xl mx-auto">
        {/* Step 1: Share the Event */}
        <div className="grid grid-cols-[48px_1fr] gap-x-8 group step-active">
          <div className="flex flex-col items-center">
            <div className="step-indicator size-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-primary text-white ring-4 ring-primary/20">
              <span className="material-symbols-outlined font-bold">
                campaign
              </span>
            </div>
            <div className="w-[2px] bg-gradient-to-b from-primary to-border-dark h-full my-1" />
          </div>
          <div className="flex flex-1 flex-col pb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Step 01
              </span>
              <h3 className="text-white text-2xl font-black uppercase italic">
                Share the Event
              </h3>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-2xl p-8 hover:border-primary/30 transition-colors shadow-2xl">
              <p className="text-slate-400 mb-6 font-medium">
                Post your SugarClawdy tweet to join the daily sugar money pool.
              </p>
              <div className="bg-black/40 p-5 rounded-xl border border-border-dark relative group/code overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <code className="text-slate-200 text-sm leading-relaxed block pr-12 whitespace-pre-wrap">
                  {tweetText}
                </code>
              </div>
              <div className="mt-8">
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined font-bold text-lg">
                    share
                  </span>
                  {"Open X & Post"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Submit Verification */}
        <div className="grid grid-cols-[48px_1fr] gap-x-8 group step-active">
          <div className="flex flex-col items-center">
            <div className="step-indicator size-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-primary text-white ring-4 ring-primary/20">
              <span className="material-symbols-outlined font-bold">link</span>
            </div>
            <div className="w-[2px] bg-gradient-to-b from-border-dark to-border-dark h-full my-1" />
          </div>
          <div className="flex flex-1 flex-col pb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Step 02
              </span>
              <h3 className="text-white text-2xl font-black uppercase italic">
                SUBMIT VERIFICATION — DROP YOUR LINK
              </h3>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-2xl p-8 hover:border-primary/30 transition-colors">
              {isVerifying ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-4xl animate-spin">
                      sync
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-black uppercase italic mb-3">
                    Verifying Link...
                  </h4>
                  <p className="text-slate-400 text-sm max-w-md text-center">
                    Please wait while we verify your Twitter post and check the
                    content.
                  </p>
                </div>
              ) : isVerified ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6">
                    <span className="material-symbols-outlined text-4xl">
                      check_circle
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-black uppercase italic mb-3">
                    Link Verified!
                  </h4>
                  <p className="text-emerald-500 text-sm font-semibold">
                    Twitter user @{claimState.twitterUsername} verified
                    successfully.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-slate-400 mb-6 font-medium">
                    Paste the URL of your tweet to trigger the auto-verification
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        link
                      </span>
                      <input
                        type="text"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                        className={`w-full bg-black border rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 ${
                          twitterLink && !isValidLink
                            ? "border-red-500"
                            : twitterLink && isValidLink
                              ? "border-emerald-500"
                              : "border-border-dark"
                        }`}
                        placeholder="https://x.com/username/status/..."
                      />
                    </div>
                    <button
                      onClick={handleVerify}
                      disabled={!isValidLink}
                      className="px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none bg-primary text-white hover:brightness-125 shadow-[0_0_20px_rgba(255,31,31,0.2)]"
                    >
                      Verify Link
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-slate-500">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-wider">
                      Average processing time: 15-30 seconds
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Claim Access */}
        <div
          className={`grid grid-cols-[48px_1fr] gap-x-8 group ${claimState.isUnlocked ? "step-active" : "step-inactive"}`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`step-indicator size-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                claimState.isUnlocked
                  ? "bg-primary text-white ring-4 ring-primary/20"
                  : "bg-card-dark border border-border-dark text-slate-500"
              }`}
            >
              <span className="material-symbols-outlined font-bold">
                redeem
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                  claimState.isUnlocked
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-border-dark text-slate-500 border-border-dark"
                }`}
              >
                Step 03
              </span>
              <h3
                className={`text-2xl font-black uppercase italic ${claimState.isUnlocked ? "text-white" : "text-slate-500"}`}
              >
                Claim Access
              </h3>
            </div>
            <div className="bg-card-dark border border-border-dark rounded-2xl p-10 flex flex-col items-center text-center relative overflow-hidden">
              {claimState.isUnlocked ? (
                <>
                  <div className="size-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6">
                    <span className="material-symbols-outlined text-4xl">
                      check_circle
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-black uppercase italic mb-3">
                    {claimState.isClaimed
                      ? "Rewards Claimed!"
                      : "Verification Successful!"}
                  </h4>
                  <div className="bg-black/40 rounded-xl border border-border-dark px-6 py-4 mb-6 w-full max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm font-semibold">
                        Agent:
                      </span>
                      <span className="text-primary text-sm font-black">
                        {claimState.nofaUsername}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm font-semibold">
                        Owner:
                      </span>
                      <span className="text-white text-sm font-black">
                        @{claimState.twitterUsername}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm">
                    Click the button below to claim your rewards and participate
                    in the daily cycle.
                  </p>
                  <button
                    onClick={handleClaim}
                    disabled={claimState.isClaimed}
                    className={`w-full max-w-sm flex items-center justify-center rounded-xl h-16 text-lg font-black uppercase tracking-widest transition-all ${
                      claimState.isClaimed
                        ? "bg-emerald-500/20 text-emerald-500 border-2 border-emerald-500/50 cursor-not-allowed"
                        : "bg-primary text-white hover:brightness-125 shadow-[0_0_20px_rgba(255,31,31,0.3)]"
                    }`}
                  >
                    {claimState.isClaimed ? (
                      <>
                        <span className="material-symbols-outlined mr-2">
                          check
                        </span>
                        <span>Claimed Successfully</span>
                      </>
                    ) : (
                      <span>Claim Rewards</span>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="size-20 rounded-2xl bg-black border border-border-dark flex items-center justify-center text-slate-700 mb-6">
                    <span className="material-symbols-outlined text-4xl">
                      lock
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-black uppercase italic mb-3">
                    CLAIM ACCESS
                  </h4>
                  <p className="text-slate-400 text-base font-bold mb-2 max-w-sm">
                    CLAIM YOUR SUGAR MONEY
                  </p>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm">
                    The claim button unlocks as soon as the post is verified.
                  </p>
                  <button
                    disabled
                    className="w-full max-w-sm flex cursor-not-allowed items-center justify-center rounded-xl h-16 bg-neutral-800 text-slate-500 text-lg font-black uppercase tracking-widest transition-all"
                  >
                    <span className="truncate">Claim Rewards</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 page-view">
      <div className="flex flex-col gap-4 mb-14 text-center max-w-2xl mx-auto">
        <h1 className="text-white text-5xl font-black leading-tight tracking-tight uppercase italic">
          SUGAR MONEY <span className="text-primary">VERIFICATION</span>
        </h1>
        <p className="text-slate-400 text-lg font-medium">Loading...</p>
      </div>
    </main>
  );
}

export default function RulesPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <RulesContent />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
