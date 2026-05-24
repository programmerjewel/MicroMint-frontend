import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, ArrowRight, Loader2, Clock, Lock } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";

export default function UserProfileCard({ user, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [changes, setChanges] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);

  const fileInputRef = useRef(null);
  const isPending = !!user?.pendingRequest;

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      role: user?.role || "worker",
    },
  });

  useEffect(() => {
    if (user) reset({ name: user.displayName, role: user.role });
  }, [user, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const onReviewSubmit = (formData) => {
    const isAdmin = user.role === "admin";
    const diff = [
      formData.name !== user.displayName && {
        label: "Name",
        from: user.displayName,
        to: formData.name,
      },
      !isAdmin &&
        formData.role !== user.role &&
        !isPending && {
          label: "Role Request",
          from: user.role,
          to: formData.role,
        },
      selectedFile && { label: "Photo", from: "Current", to: "New Upload" },
    ].filter(Boolean);

    if (!diff.length) return setShowEdit(false);
    setChanges(diff);
    setShowEdit(false);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      const data = getValues();
      const photoURL = selectedFile
        ? await uploadImage(selectedFile)
        : (user.photoURL || "");
        
      await onUpdate({ ...data, photoURL });
      setShowConfirm(false);
      setSelectedFile(null);
      setPreview(null);
    } catch {
       // Error is handled by the mutation in ProfilePage
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 dark:border dark:border-zinc-800 pt-0 bg-white dark:bg-zinc-950">
        <CardHeader className="p-0">
          <div className="h-32 bg-zinc-900 dark:bg-zinc-800" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-10 mb-5">
            <Avatar className="w-20 h-20 ring-4 ring-white dark:ring-zinc-950 shadow-md">
              <AvatarImage className="object-cover" src={user.photoURL} />
              <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                {user.displayName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEdit(true)}
              className="rounded-xl font-semibold text-xs border-zinc-200 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <Pencil size={12} className="mr-1.5" /> Edit Profile
            </Button>
          </div>

          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">
            {user.displayName}
          </h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">{user.email}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 mb-4">
            Role:{" "}
            <span className="capitalize font-medium text-zinc-600 dark:text-zinc-300">
              {user.role}
            </span>
          </p>

          {isPending && (
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-lg p-3 flex items-center gap-2.5">
              <Clock size={15} className="text-amber-500 dark:text-amber-400 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                Switch to <b>{user.pendingRequest.requestedRole}</b> is
                pending admin approval.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-zinc-950 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 dark:text-zinc-50">Edit Profile</DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
              Update your name, photo, or request a role change.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-4 mt-2">
            <div className="flex justify-center py-1">
              <img
                src={preview || user.photoURL}
                onClick={() => fileInputRef.current?.click()}
                className="h-24 w-24 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-800 cursor-pointer hover:opacity-80 transition-opacity"
                alt="Preview"
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Full Name</Label>
                <Input 
                  {...register("name", { required: true })} 
                  className="rounded-lg dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50" 
                />
              </div>

              {user.role !== "admin" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Account Role</Label>
                  <div className="relative">
                    <select
                      {...register("role")}
                      disabled={isPending}
                      className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm appearance-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300"
                    >
                      <option value="worker">Worker</option>
                      <option value="buyer">Buyer</option>
                    </select>
                    {isPending && <Lock className="absolute right-3 top-3 text-zinc-400 dark:text-zinc-500" size={14} />}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              Review Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-sm rounded-2xl bg-white dark:bg-zinc-950 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-center text-zinc-900 dark:text-zinc-50">Confirm Updates</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 my-2">
            {changes.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-[11px] bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                <span className="font-bold text-zinc-400 dark:text-zinc-500 uppercase">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-zinc-300 dark:text-zinc-600">{c.from}</span>
                  <ArrowRight size={10} className="text-zinc-300 dark:text-zinc-600" />
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">{c.to}</span>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="w-full h-11 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            {isConfirming ? <Loader2 className="animate-spin" size={16} /> : "Confirm & Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}