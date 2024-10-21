import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import GridPattern from "@/components/custom/animated-grid-background";

//shadcn Ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AuthPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center px-1">
      <GridPattern
        width={25}
        height={25}
        maxOpacity={0.07}
        x={-1}
        y={-1}
        strokeDasharray={"5 4"}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
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
