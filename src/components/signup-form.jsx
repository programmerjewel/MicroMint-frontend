import { useState } from "react";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { uploadImage } from "@/utils/uploadImage";
import { FcGoogle } from "react-icons/fc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { axiosSecure } from "@/hooks/useAxiosSecure";

export function SignupForm({ ...props }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { createUser, updateUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {

      const photoURL = await uploadImage(data.profilePicture[0]);

      // Create user
      await createUser(data.email, data.password);
      await updateUser(data.name, photoURL);

      //add role on db save with the SPECIFIC role
        const userInfo = {
        name: data.name,
        image: photoURL,
        email: data.email,
        role: data.role, 
      };

      await axiosSecure.post(`/users`, userInfo);
      navigate("/");

    } catch (error) {
      console.error("Signup Error:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const items = [
    { label: "Worker", value: "worker" },
    { label: "Buyer", value: "buyer" },
  ];

  return (
    <Card {...props} className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="font-bold">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="relative h-20 w-20 group">
              <div className="h-full w-full rounded-md border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted">
                {preview ? (
                  <img
                    src={preview}
                    className="h-full w-full object-cover"
                    alt="Avatar"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground uppercase">
                    Upload
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                {...register("profilePicture", {
                  required: "Required",
                  onChange: handlePreview,
                })}
              />
            </div>
            <p className="text-xs font-mono text-muted-foreground truncate max-w-37.5">
              {fileName || "NO FILE SELECTED"}
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input {...register("name", { required: "Name is required" })} />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
            </Field>

            <Field>
              <FieldLabel>Add a Role</FieldLabel>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Please select a role" }}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-destructive">{errors.role.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  {...register("password", { required: true, minLength: 8 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="pr-10"
                  {...register("confirmPassword", {
                    validate: (val) =>
                      val === getValues("password") || "No match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </FieldGroup>

          <Field>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Create Account"}
            </Button>
          </Field>

          <FieldSeparator className="my-4">Or continue with</FieldSeparator>
          
          <Button variant="outline" type="button" onClick={onGoogleLogin} className="w-full">
            <FcGoogle />
            Register with Google
          </Button>

          <FieldDescription className="text-center">
            Have an account?{" "}
            <Link to="/login" className="underline">
              Log In
            </Link>
          </FieldDescription>
        </form>
      </CardContent>
    </Card>
  );
}
