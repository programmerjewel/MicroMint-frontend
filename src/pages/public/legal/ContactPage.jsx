import { useState } from "react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add backend API integration logic here if needed
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[80vh] flex flex-col justify-center animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Context Side */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions about your Dashboard metrics, micropayments, or ran into a technical snag? We're here to help.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t text-sm">
            <div>
              <h3 className="font-semibold text-foreground">Support Hours</h3>
              <p className="text-muted-foreground">Monday – Friday, 9:00 AM – 5:00 PM EST</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Direct Email</h3>
              <p className="text-muted-foreground">support@micromint.com</p>
            </div>
          </div>
        </div>

        {/* Interactive Form Box */}
        <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Thank you for reaching out. A member of the MicroMint team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-medium text-foreground">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder="Describe your issue or question..."
                />
              </div>

              <Button type="submit" className="w-full mt-2">
                Send Message
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;