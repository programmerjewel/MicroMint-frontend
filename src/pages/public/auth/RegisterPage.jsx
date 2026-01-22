import { SignupForm } from "@/components/signup-form";


const RegisterPage = () => {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/50">
          <div className="w-full max-w-sm">
            <SignupForm/>
          </div>
        </div>
  );
};

export default RegisterPage;