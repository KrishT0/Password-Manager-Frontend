import React from "react";

//shadcn Ui imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AuthPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center px-1">
      <Tabs defaultValue="sign-in" className="w-[450px]">
        <TabsList className="w-full">
          <TabsTrigger value="sign-in" className="w-1/2">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="sign-up" className="w-1/2">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
