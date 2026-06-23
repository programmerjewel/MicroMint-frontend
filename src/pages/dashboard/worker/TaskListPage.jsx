import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  ArrowUpDown,
  TrendingUp,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TasksContainer from "@/components/features/dashboard/worker/TasksContainer";
import DashboardSectionHeader from "@/components/ui/dashboard-section-header";
import Loading from "@/components/shared/Loading";
import { Input } from "@/components/ui/input";
import { LiaCoinsSolid } from "react-icons/lia";
import useAuth from "@/hooks/useAuth";

const REWARD_RANGES = [
  { label: "Any Amount", min: "", max: "" },
  { label: "Under 50 coins", min: 0, max: 50 },
  { label: "50 - 100 coins", min: 50, max: 100 },
  { label: "100 - 200 coins", min: 100, max: 200 },
  { label: "Over 200 coins", min: 200, max: 999999 },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt_desc" },
  { label: "Highest Reward", value: "reward_desc" },
  { label: "Lowest Reward", value: "reward_asc" },
  { label: "Closing Soonest", value: "deadline_asc" },
];

const TaskListPage = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;

  // search & filter States
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [filters, setFilters] = useState({
    rewardRangeIndex: 0,
    sortBy: "createdAt_desc",
  });

  // handle search input debounce (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleRewardDropdownChange = (e) => {
    const index = Number(e.target.value);
    setFilters((prev) => ({ ...prev, rewardRangeIndex: index }));
    setPage(1);
  };

  // react query fetch
  const { data, isLoading, isPlaceholderData } = useQuery({
    // use primitive values in queryKey to guarantee React Query detects changes
    queryKey: ["tasks", page, debouncedSearch, filters.rewardRangeIndex, filters.sortBy],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit });
      if (debouncedSearch) params.append("search", debouncedSearch);
      
      const range = REWARD_RANGES[filters.rewardRangeIndex];
      if (range) {
        if (range.min !== "") params.append("minReward", range.min);
        if (range.max !== "") params.append("maxReward", range.max);
      }
      
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const res = await axiosSecure.get(`/tasks?${params.toString()}`);
      return res.data;
    },
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
  });

  const tasks = data?.tasks || [];
  const meta = data?.meta || { totalTasks: 0, totalPages: 1, currentPage: 1 };

  const clearAllFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setFilters({
      rewardRangeIndex: 0,
      sortBy: "createdAt_desc",
    });
    setPage(1);
  };

  const isFiltered =
    searchInput !== "" ||
    filters.rewardRangeIndex !== 0 ||
    filters.sortBy !== "createdAt_desc";

  // Fetch the logged-in user's submissions to map status tags
  const {user} = useAuth();
  const { data: submissionData } = useQuery({
    queryKey: ["userSubmissionsStatusMap", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submitted-task/${user?.email}?limit=1000`);
      return res.data?.submissions || [];
    },
    enabled: !!user?.email,
  });

  // Convert the submission list into a clean Key-Value lookup object map: { [taskId]: "status" }
  const taskStatusMap = {};
  submissionData?.forEach((sub) => {
    taskStatusMap[sub.task_id] = sub.status?.toLowerCase();
  });

  return (
    <section className="space-y-6">
      <DashboardSectionHeader title="Available Tasks" />

      <div className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 dark:text-slate-400" />
            <Input
              type="text"
              placeholder="Search tasks, buyers, or descriptions..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-11 py-3"
            />
          </div>

          <div className="relative w-full md:w-52">
            <LiaCoinsSolid className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 dark:text-slate-400" />
            <select
              name="rewardRange"
              value={filters.rewardRangeIndex}
              onChange={handleRewardDropdownChange}
              className="w-full pl-10 pr-10 py-2 h-10 rounded-md border border-input bg-background dark:bg-[#1E212B] text-foreground text-sm outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
            >
              {REWARD_RANGES.map((range, index) => (
                <option key={index} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
            <TrendingUp className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 dark:text-slate-500 pointer-events-none" />
          </div>

          <div className="relative w-full md:w-52">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 dark:text-slate-400" />
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-10 py-2 h-10 rounded-md border border-input bg-background dark:bg-[#1E212B] text-foreground text-sm outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 dark:text-slate-500 pointer-events-none" />
          </div>

          <Button
            variant="outline"
            disabled={!isFiltered}
            onClick={clearAllFilters}
            className="w-full md:w-auto h-10 gap-2 shrink-0 border-slate-200 dark:border-slate-800"
          >
            <RotateCcw className="h-4 w-4" /> Clear
          </Button>
        </div>

        {isFiltered && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-muted-foreground">
            <span className="font-medium">Active Filters:</span>
            
            {/* Search Query Badge */}
            {searchInput !== "" && (
              <Badge variant="secondary" className="gap-1 px-2 py-0.5 rounded-md flex items-center">
                Query: "{searchInput}"
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchInput("");
                    setDebouncedSearch(""); // Clears query immediately
                    setPage(1);
                  }}
                  className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {/* Reward Target Badge */}
            {filters.rewardRangeIndex > 0 && (
              <Badge variant="amber" className="gap-1 px-2 py-0.5 rounded-md flex items-center">
                Coins: {REWARD_RANGES[filters.rewardRangeIndex]?.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFilters((prev) => ({ ...prev, rewardRangeIndex: 0 }));
                    setPage(1);
                  }}
                  className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {/* Sorting Choice Badge */}
            {filters.sortBy !== "createdAt_desc" && (
              <Badge variant="secondary" className="gap-1 px-2 py-0.5 rounded-md flex items-center">
                Sort: {SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFilters((prev) => ({ ...prev, sortBy: "createdAt_desc" }));
                    setPage(1);
                  }}
                  className="ml-1 p-0.5 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {isLoading && !isPlaceholderData ? (
        <Loading variant="fullscreen" text="Updating results..." size="xl" />
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-muted/20 dark:bg-slate-900/10 shadow-inner">
          <ClipboardList className="h-14 w-14 text-muted-foreground/40 mb-3" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground">No matching tasks found</h3>
          <p className="text-base text-muted-foreground max-w-sm mt-1 mb-6">
            Try adjusting your search criteria, price range boundaries, or status parameters.
          </p>
          <Button variant="outline" size="lg" onClick={clearAllFilters} className="dark:border-slate-800 dark:hover:bg-slate-800">
            Reset All Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-[#625AFE] rounded-full"></span>
              <div className="text-base font-medium text-foreground">
                Showing <span className="font-bold text-lg">{tasks.length}</span> of{" "}
                <span className="font-bold text-lg">{meta.totalTasks}</span> tasks
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground/80 dark:text-slate-400 font-medium">
              <Clock className="h-4 w-4" />
              Updated just now
            </div>
          </div>

          <TasksContainer tasks={tasks} statusMap={taskStatusMap} />

          {meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="gap-1 disabled:cursor-not-allowed dark:border-slate-800 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Page <span className="text-foreground font-bold">{meta.currentPage}</span> of{" "}
                <span className="text-foreground font-bold">{meta.totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!isPlaceholderData && page < meta.totalPages) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={page >= meta.totalPages || isPlaceholderData}
                className="gap-1 disabled:cursor-not-allowed dark:border-slate-800 dark:hover:bg-slate-800"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TaskListPage;