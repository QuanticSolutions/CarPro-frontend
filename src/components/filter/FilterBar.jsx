import { useState } from "react";
import { List, Grid } from "lucide-react";
import { Select, MenuItem } from "@mui/material";

export default function FilterBar() {
  const [view, setView] = useState("grid");

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">VIEW</span>
        <button onClick={() => setView("list")} className={view === "list" ? "text-black" : "text-gray-400"}>
          <List size={20} />
        </button>
        <button onClick={() => setView("grid")} className={view === "grid" ? "text-black" : "text-gray-400"}>
          <Grid size={20} />
        </button>
      </div>
    </div>
  );
}
