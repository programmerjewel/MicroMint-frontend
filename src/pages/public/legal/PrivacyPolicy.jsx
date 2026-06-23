import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[80vh]">
      {/* Page Header */}
      <div className="space-y-2 mb-8 pb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground">Last Updated: June 21, 2026</p>
      </div>

      {/* Structured Content Block */}
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          At <strong>MicroMint</strong>, accessible from our application platform, one of our primary priorities is the complete privacy of our visitors and micro-task contributors. This Privacy Policy document outlines the types of data collected and recorded by MicroMint and how we process it.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            When registering an account to access our user role ecosystems (Worker, Buyer, Admin), we collect relevant contact identifiers. This includes your name, email address, profile metadata, and security tokens provided during Firebase authentication.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>We process your information inside the secure database environment to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide, maintain, and secure essential Dashboard functionality.</li>
            <li>Process coin balances, tracking ledgers, and automated worker payouts.</li>
            <li>Track task submissions and prevent multi-account submission fraud.</li>
            <li>Send administrative support notifications and security alerts.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">3. Log Metrics & Essential Cookies</h2>
          <p>
            MicroMint follows standard operational architecture using log files and browser cookies. These cookies are strictly functional and keep your browser safely authenticated across dashboard component routes via secure web context layers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">4. Data Deletion & Requests</h2>
          <p>
            Users reserve full rights to request deletion of their profile telemetry, task history logs, and dashboard association records at any point by contacting our technical administrators.
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

export default PrivacyPolicy;