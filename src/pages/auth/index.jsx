import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import GridPattern from "@/components/custom/animated-grid-background";

// icon imports
import { House } from "lucide-react";

// shadcn UI imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto relative flex h-screen w-screen justify-center items-center px-1">
      <GridPattern
        width={25}
        height={25}
        maxOpacity={0.07}
        x={-1}
        y={-1}
        strokeDasharray={"5 4"}
        className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <div
        className="absolute top-3 left-3 sm:top-10 sm:left-10 rounded-full bg-primary cursor-pointer hover:bg-primary/90 text-black p-2"
        onClick={() => navigate("/")}
      >
        <House className="h-5" />
      </div>
      <Tabs defaultValue="sign-in" className="w-[450px] z-10">
        <TabsList className="w-full">
          <TabsTrigger value="sign-in" className="w-1/2">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="sign-up" className="w-1/2">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in" className="z-10 bg-background">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up" className="z-10 bg-background">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
