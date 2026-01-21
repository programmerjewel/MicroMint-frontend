import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <section className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <FaExclamationTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>      
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            <FaHome className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;