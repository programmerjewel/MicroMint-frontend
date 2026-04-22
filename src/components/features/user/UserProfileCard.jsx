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
      // Ensure we have a valid string fallback for photoURL
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
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 pt-0">
        <CardHeader className="p-0">
          <div className="h-32 bg-zinc-900" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-10 mb-5">
            <Avatar className="w-20 h-20 ring-4 ring-white shadow-md">
              <AvatarImage className="object-cover" src={user.photoURL} />
              <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEdit(true)}
              className="rounded-xl font-semibold text-xs"
            >
              <Pencil size={12} className="mr-1.5" /> Edit Profile
            </Button>
          </div>

          <h1 className="text-lg font-bold text-zinc-900 mb-0.5">
            {user.displayName}
          </h1>
          <p className=" text-sm text-zinc-400">{user.email}</p>
          <p className="text-xs text-zinc-400 mt-2 mb-4">
            Role:{" "}
            <span className="capitalize font-medium text-zinc-600">
              {user.role}
            </span>
          </p>

          {isPending && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-center gap-2.5">
              <Clock size={15} className="text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Switch to <b>{user.pendingRequest.requestedRole}</b> is
                pending admin approval.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your name, photo, or request a role change.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-4 mt-2">
            <div className="flex justify-center py-1">
              <img
                src={preview || user.photoURL}
                onClick={() => fileInputRef.current?.click()}
                className="h-24 w-24 rounded-full object-cover border-2 border-zinc-200 cursor-pointer hover:opacity-80 transition-opacity"
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
                <Label className="text-xs font-semibold text-zinc-500 uppercase">Full Name</Label>
                <Input {...register("name", { required: true })} className="rounded-lg" />
              </div>

              {user.role !== "admin" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-500 uppercase">Account Role</Label>
                  <div className="relative">
                    <select
                      {...register("role")}
                      disabled={isPending}
                      className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm appearance-none disabled:opacity-50"
                    >
                      <option value="worker">Worker</option>
                      <option value="buyer">Buyer</option>
                    </select>
                    {isPending && <Lock className="absolute right-3 top-3 text-zinc-400" size={14} />}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full rounded-xl bg-zinc-900">
              Review Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">Confirm Updates</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 my-2">
            {changes.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-[11px] bg-zinc-50 p-3 rounded-lg border">
                <span className="font-bold text-zinc-400 uppercase">{c.label}</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-zinc-300">{c.from}</span>
                  <ArrowRight size={10} className="text-zinc-300" />
                  <span className="font-bold text-zinc-700">{c.to}</span>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="w-full h-11 rounded-xl bg-zinc-900 font-bold"
          >
            {isConfirming ? <Loader2 className="animate-spin" size={16} /> : "Confirm & Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}