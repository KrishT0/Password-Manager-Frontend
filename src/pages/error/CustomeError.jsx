import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CustomError() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Oops! The page you're trying to not responsing correctly. Please refresh
        or try again later.
      </p>
      <Button variant="default" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
}
