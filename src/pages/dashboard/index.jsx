import { useState } from "react";

//icon imports
import { CirclePlus, Search } from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordTable from "./PasswordTable";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center my-5">Dashboard</h1>

      <section className="max-w-[1000px] mx-auto flex gap-5 items-center justify-start mt-10">
        <div className="relative w-[400px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search Website"
            className="pl-10"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <CirclePlus size={18} /> <p className="ml-2">Add Password</p>
        </Button>
      </section>

      <section className="max-w-[1000px] mx-auto mt-5 border rounded-md">
        <PasswordTable searchQuery={searchQuery} />
      </section>
    </div>
  );
}

export default Dashboard;
