import { Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LiaCoinsSolid } from "react-icons/lia";

const TaskCard = ({ task }) => {
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

  return (
    <Card className="p-0 flex flex-col h-full group overflow-hidden shadow-3xl transition-all duration-500 rounded-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Image Section */}
      <div className="relative h-42 w-full overflow-hidden bg-red-400">
        <img 
          src={task_image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"} 
          alt={task_title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Price Tag */}
        <div className="absolute top-3 right-3">
          <div className="bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 backdrop-blur-md px-2 py-1 rounded-full shadow-sm flex items-center gap-1 border border-white/20 dark:border-amber-900/30">
            <div className="flex items-center justify-center gap-2">
              <LiaCoinsSolid className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold">{payable_amount}</span>
            </div>
          </div>
        </div>

        {/* Spots Left Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-slate-900/80 text-white hover:bg-slate-900 dark:bg-slate-800/90 dark:hover:bg-slate-700 border-none backdrop-blur-sm py-1">
            <Users className="h-3 w-3 mr-1.5" />
            {required_workers} positions left
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col justify-between grow">
        <div>
          {/* Buyer Section */}
          <div className="flex items-center gap-2 mb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-6 w-6 ring ring-slate-200 dark:ring-slate-800">
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
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-tight uppercase">
              {buyer?.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-md text-slate-800 dark:text-slate-100 leading-snug mb-4 line-clamp-2">
            {task_title}
          </h3>
        </div>

        <div>
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
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

          {/* Modern Button */}
          <Button 
            onClick={() => navigate(`/dashboard/tasks/${_id}`)} 
            className="w-full mt-6 bg-brand-primary hover:bg-brand-primary/90 dark:bg-brand-primary dark:hover:bg-brand-primary/80 text-white transition-all duration-300 group/btn rounded-lg"
          >
            Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

TaskCard.propTypes = {
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