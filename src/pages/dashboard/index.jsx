import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

//icon imports
import { CirclePlus, Search } from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordTable from "./PasswordTable";
import PasswordModal from "./PasswordModal";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refetchChild, setRefetchChild] = useState(false);
  const dialogueOpenTriggerRef = useRef(null);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="px-1">
      <div className="relative ">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-center my-3 sm:my-5">
          Dashboard
        </h1>
        <Button
          variant="ghost"
          className="absolute sm:-top-1 sm:right-5 right-1 -top-2"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
      <section className="max-w-[1000px] mx-auto flex gap-5 items-center justify-start mt-10">
        <div className="relative w-[400px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="search-website"
            placeholder="Search Website"
            className="pl-10 bg-secondary"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => dialogueOpenTriggerRef.current.click()}
          variant="secondary"
        >
          <CirclePlus size={18} /> <p className="ml-2">Add Password</p>
        </Button>
      </section>

      <section className="max-w-[1000px] mx-auto mt-5 border rounded-md">
        <PasswordTable searchQuery={searchQuery} refetchChild={refetchChild} />
      </section>
      <PasswordModal
        ref={dialogueOpenTriggerRef}
        addFlag={true}
        setRefetchChild={setRefetchChild}
      />
    </div>
  );
}

export default Dashboard;
