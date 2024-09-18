import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HomepageSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      toast({
        title: "Success",
        description:
          "🎉 Congrats! You have successfully subscribed to our newsletter",
      });
      setEmail("");
    } else {
      toast({
        title: "Error",
        description: "Invalid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <form
        className="flex space-x-2 max-[500px]:flex-col gap-5 items-center"
        onSubmit={submitHandler}
      >
        <Input
          className="max-w-lg flex-1"
          placeholder="Enter your email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}

export default HomepageSignup;
