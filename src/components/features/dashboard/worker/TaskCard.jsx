import { Calendar, DollarSign, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Card className="p-0 flex flex-col h-full group overflow-hidden shadow-3xl transition-all duration-500 rounded-md">
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
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-white/20">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-sm font-bold text-slate-900">{payable_amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Spots Left Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-slate-900/80 text-white hover:bg-slate-900 border-none backdrop-blur-sm py-1">
            <Users className="h-3 w-3 mr-1.5" />
            {required_workers} positions left
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Buyer Section */}
        <div className="flex items-center gap-2 mb-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="h-6 w-6 ring-2 ring-offset-2 ring-slate-100">
                  <AvatarImage src={buyer?.image} />
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {buyer?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>Posted by {buyer?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xs font-semibold text-slate-500 tracking-tight uppercase">
            {buyer?.name}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-slate-800 leading-snug mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {task_title}
        </h3>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline</p>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isDeadlineNear() ? "text-orange-600" : "text-slate-600"}`}>
              <Clock className="h-3.5 w-3.5" />
              {formattedDate}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Calendar className="h-3.5 w-3.5 text-blue-500" />
              Fast Payout
            </div>
          </div>
        </div>

        {/* Modern Button */}
        <Button 
          onClick={() => navigate(`/dashboard/tasks/${_id}`)} 
          className="w-full mt-6 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 group/btn rounded-lg"
        >
          Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
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