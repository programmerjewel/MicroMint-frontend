import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";


const RoleCard = ({ icon, role, description, features, iconBg }) => {
  const Icon = icon;
  return (
    <Card className="group relative overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-brand-primary transition-all duration-300 shadow-none dark:bg-slate-900">
      <CardHeader>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${iconBg}`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">{role}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
