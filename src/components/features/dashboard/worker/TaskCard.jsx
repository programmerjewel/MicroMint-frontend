import { Calendar, Users, Clock, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LiaCoinsSolid } from "react-icons/lia";

const TaskCard = ({ task, currentStatus }) => {
  const navigate = useNavigate();
  const {
    _id,
    task_title,
    buyer,
    completion_date,
    payable_amount,
    required_workers,
    task_image_url
  } = task;

  const formattedDate = new Date(completion_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isDeadlineNear = () => {
    const diffDays = Math.ceil((new Date(completion_date) - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  // UI styling configurations based on task submissions status
  const statusConfig = {
    approved: {
      className: "bg-brand-secondary dark:bg-brand-secondary/90 text-gray-800 shadow-md backdrop-blur-xs",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      label: "Completed",
      disableAction: true,
    },
    pending: {
      className: "bg-blue-500/90 dark:bg-blue-600/90 text-white shadow-md backdrop-blur-xs",
      icon: <Clock className="h-3 w-3 mr-1" />,
      label: "Pending",
      disableAction: false,
    },
    in_review: {
      className: "bg-amber-500/90 dark:bg-amber-600/90 text-white shadow-md backdrop-blur-xs",
      icon: <RefreshCw className="h-3 w-3 mr-1 animate-spin" style={{ animationDuration: '3s' }} />,
      label: "In Revision",
      disableAction: false,
    },
    rejected: {
      className: "bg-rose-500/90 dark:bg-rose-600/90 text-white shadow-md backdrop-blur-xs",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
      label: "Rejected",
      disableAction: false,
    },
  };

  const currentStatusConfig = statusConfig[currentStatus];

  return (
    <Card className="p-0 flex flex-col h-full group overflow-hidden shadow-3xl transition-all duration-500 rounded-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      
      {/* Image Section */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img 
          src={task_image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"} 
          alt={task_title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* --- STATUS BADGE FLOATING ON TOP RIGHT OF IMAGE --- */}
        {currentStatusConfig && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className={`px-2.5 py-1 text-[11px] font-semibold flex items-center tracking-wide rounded-md border-none ${currentStatusConfig.className}`}>
              {currentStatusConfig.icon}
              {currentStatusConfig.label}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-5 flex flex-col justify-between grow space-y-4">
        <div className="space-y-3">
          
          {/* Top Row: Buyer Info */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6 ring ring-slate-100 dark:ring-slate-900">
                    <AvatarImage src={buyer?.image} />
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                      {buyer?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Posted by {buyer?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-tight uppercase line-clamp-1">
              {buyer?.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-md text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
            {task_title}
          </h3>

          {/* Coins & Positions left */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {/* Positions Left Badge */}
            <div className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-slate-100 dark:border-slate-800/60">
              <Users className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span className="text-xs font-semibold">{required_workers} positions</span>
            </div>
            {/* Coins Badge */}
            <div className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-amber-100 dark:border-amber-900/30">
              <LiaCoinsSolid className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="text-xs font-bold tracking-tight">{payable_amount} Coins</span>
            </div>

          </div>
        </div>

        <div>
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Deadline</p>
              <div className={`flex items-center gap-1.5 text-xs font-medium ${isDeadlineNear() ? "text-orange-600 dark:text-orange-400" : "text-slate-600 dark:text-slate-300"}`}>
                <Clock className="h-3.5 w-3.5" />
                {formattedDate}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Efficiency</p>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                <Calendar className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                Fast Payout
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => navigate(`/dashboard/tasks/${_id}`)} 
            disabled={currentStatusConfig?.disableAction}
            className={`w-full mt-5 text-white transition-all duration-300 group/btn rounded-lg ${
              currentStatusConfig?.disableAction 
                ? "bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed" 
                : "bg-brand-primary hover:bg-brand-primary/90"
            }`}
          >
            {currentStatusConfig?.disableAction ? "Task Completed" : "Details"}
            {!currentStatusConfig?.disableAction && (
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
  currentStatus: PropTypes.string,
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    task_title: PropTypes.string.isRequired,
    completion_date: PropTypes.string.isRequired,
    payable_amount: PropTypes.number.isRequired,
    required_workers: PropTypes.number.isRequired,
    task_image_url: PropTypes.string,
    buyer: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
};

export default TaskCard;