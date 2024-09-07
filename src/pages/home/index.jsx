import React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import ThemeToggle from "@/components/custom/theme-toggle";

//lucid icon imports
import { Lock, RefreshCw, Share2 } from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HomepageSignup from "./HomepageSignup";

function HomePage() {
  return (
    <HomeLayout>
      <header className="">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center p-2">
          <h1 className="text-lg font-semibold border p-1 rounded-full">PM</h1>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <section className="max-w-[1440px] mx-auto p-2 flex justify-center gap-3 min-[1000px]:gap-5 flex-col items-center h-[60vh] sm:h-[75vh]">
        <h1 className="text-3xl sm:text-5xl min-[1000px]:text-7xl text-primary font-bold">
          Secure Your Digital Life
        </h1>
        <p className="text-lg sm:text-xl min-[1000px]:text-2xl text-gray-400 font-normal sm:w-1/2 text-center">
          Manage all your passwords in one secure place. Stay protected with our
          Password Manager.
        </p>
        <div className="space-x-4">
          <Button className="min-[1000px]:text-lg">Get Started</Button>
          <Button variant="outline" className="min-[1000px]:text-lg ">
            Learn More
          </Button>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-primary-foreground">
        <div className="max-w-[1440px] mx-auto p-2 pb-5 flex flex-col gap-16 items-center justify-center min-h-[65vh]">
          <h1 className="text-4xl mt-5 md:text-6xl font-bold">Key Features</h1>
          <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 bg-secondary p-5 rounded-lg">
              <Lock className="h-10 w-10 mb-2" />
              <h3 className="text-xl font-bold">Secure Encryption</h3>
              <p className="text-base text-gray-500 dark:text-gray-400  text-center">
                Your data is protected with industry-leading encryption
                technology.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 bg-secondary p-5 rounded-lg">
              <RefreshCw className="h-10 w-10 mb-2" />
              <h3 className="text-xl font-bold">Auto-Sync</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                Your passwords sync automatically across all your devices.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 bg-secondary p-5 rounded-lg">
              <Share2 className="h-10 w-10 mb-2" />
              <h3 className="text-xl font-bold">Secure Sharing</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                Share passwords securely with family members or colleagues.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" max-w-[1440px] px-2 mx-auto h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold  sm:text-5xl">
            Start Securing Your Passwords Today
          </h2>
          <p className="max-w-[900px] text-gray-500 sm:text-lg md:text-xl dark:text-gray-400">
            Join thousands of users who trust Password Manager to manage their
            digital lives. Sign up now and take control of your online security.
          </p>
        </div>
        <HomepageSignup />
      </section>
      <footer className="border-t">
        <section className="flex flex-col items-center gap-2 sm:flex-row justify-between p-8 max-w-[1440px] mx-auto">
          <p className="text-sm">
            © 2024 Password Manager. All rights reserved.
          </p>
          <div className="flex gap-4">
            <p className="text-sm hover:underline cursor-pointer">
              Terms of Service
            </p>
            <p className="text-sm hover:underline cursor-pointer">Privacy</p>
          </div>
        </section>
      </footer>
    </HomeLayout>
  );
}

export default HomePage;
