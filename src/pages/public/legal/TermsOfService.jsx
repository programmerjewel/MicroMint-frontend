import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[80vh]">
      {/* Page Header */}
      <div className="space-y-2 mb-8 pb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
        <p className="text-xs text-muted-foreground">Last Updated: June 21, 2026</p>
      </div>

      {/* Legal Conditions */}
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          Welcome to <strong>MicroMint</strong>! These global terms and conditions govern your accessibility parameters and user usage rights across the MicroMint web platform and associated dashboards.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By creating an account, interacting with micro-tasks, purchasing coins, or accessing our control dashboard, you explicitly accept these programmatic terms. If you disagree with any portion of these structural rules, you must cease site interaction immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">2. Account Responsibility & Integrity</h2>
          <p>
            Users are explicitly responsible for preserving security tokens, passwords, and authorization keys. MicroMint enforces a strict <strong>one-account-per-individual</strong> compliance standard. Utilizing automated scraping tools, fake submission links, or multi-account spoofing configurations will lead to permanent coin balance forfeiture and administrative bans.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">3. Coin Purchases & Payout Settlements</h2>
          <p>
            Coin purchasing rules are managed under localized secure ledger tokens. Withdrawal requests submitted by Workers are subject to Admin oversight verification pipelines. Buyer coin deposits used to distribute tasks are non-refundable once tasks have been propagated to active worker pools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">4. System Availability & Disclaimers</h2>
          <p>
            MicroMint resources are provided "as-is". While we aim for flawless uptime, we are not liable for transaction parsing sync errors, localized internet latency issues, or unexpected host cloud downtime occurring inside your dashboard panel.
          </p>
        </section>
      </div>

      {/* Navigation Return Hook */}
      <div className="mt-12 pt-6 border-t flex justify-end">
        <Button variant="outline" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default TermsOfService;