import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProject: string;
  setFilterProject: (project: string) => void;
  projects: string[];
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  filterProject,
  setFilterProject,
  projects,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by unit name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filterProject} onValueChange={setFilterProject}>
        <SelectTrigger className="w-full md:w-64">
          <SelectValue placeholder="Filter by project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {projects.map((project) => (
            <SelectItem key={project} value={project}>
              {project}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
