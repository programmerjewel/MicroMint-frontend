import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Target,
  ArrowRight,
  Globe,
  CheckCircle2
} from "lucide-react";
import RoleCard from "@/components/features/public/RoleCard";



const AboutPage = () => {
  return (
    <div className="min-h-screen dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-brand-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-brand-secondary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge variant="default" className="mb-6 dark:bg-slate-800 dark:text-slate-200">
            The Future of Micro-Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-slate-900 dark:text-white mb-8 tracking-tight">
            Work Small. <br />
            <span className="text-brand-primary">Earn Big.</span>
          </h1>
          <p className="text-md text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            MicroMint is a high-performance marketplace where effort meets instant rewards. 
            We empower a global community to monetize their skills through bite-sized tasks.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Button size="lg" variant="default">
              Start Earning Now
            </Button>
            <Button size="lg" variant="outline">
              Post a Task
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Tasks are approved and paid out in record time through our streamlined review system.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-brand-secondary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Verified Security</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Our 2-step verification process ensures that both buyers and workers are protected.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-amber-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-brand-accent" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Global Opportunity</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Access a borderless economy with tasks tailored to your region and expertise.</p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 px-4 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">The Ecosystem</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Three pillars, one unified platform. Whether you're here to work or grow, we've built a space for you.</p>
            </div>
            <div className="h-1 grow mx-10 bg-slate-200 dark:bg-slate-700 mb-4 hidden md:block rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard 
              role="The Worker"
              icon={Briefcase}
              iconBg="bg-[var(--brand-primary)]"
              description="Complete micro-tasks, climb the leaderboard, and withdraw your earnings directly to your wallet."
              features={["Unlimited Task Access", "Instant Coin Crediting", "Real-time Notifications"]}
            />
            <RoleCard 
              role="The Buyer"
              icon={Users}
              iconBg="bg-[var(--brand-secondary)]"
              description="Deploy massive campaigns in minutes. Reach thousands of real users for engagement and testing."
              features={["Advanced Task Targeting", "Automated Approval Tools", "Bulk Coin Purchasing"]}
            />
            <RoleCard 
              role="The Admin"
              icon={Target}
              iconBg="bg-slate-900 dark:bg-slate-800"
              description="Maintaining the equilibrium of the marketplace. Security, integrity, and support at scale."
              features={["Dispute Resolution", "User Role Management", "System Health Monitoring"]}
            />
          </div>
        </div>
      </section>

      {/* Modern Mission Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-brand-primary rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
          <TrendingUp className="w-64 h-64 text-white/10 absolute -bottom-10 -right-10 rotate-12" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Our Core <br /> Philosophy</h2>
              <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                We believe the future of work isn't 9-to-5; it's any time, anywhere. 
                MicroMint turns every digital interaction into a value-exchange. 
                Our platform is engineered to be as fast as a "Zap" and as reliable 
                as a "Shield."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <div className="text-3xl font-bold mb-1 text-brand-accent">100%</div>
                <div className="text-xs uppercase font-bold tracking-widest text-indigo-200">Transparency</div>
              </div>
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <div className="text-3xl font-bold mb-1 text-brand-secondary">24/7</div>
                <div className="text-xs uppercase font-bold tracking-widest text-indigo-200">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 italic tracking-tight">Ready to join the minting revolution?</h2>
        <Button className="group bg-slate-900 dark:bg-slate-800 text-white rounded-full px-8 py-6 h-auto text-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all">
          Create Free Account <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;