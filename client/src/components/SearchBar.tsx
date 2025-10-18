import { useState, useEffect, useCallback } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

interface Project {
  id: number;
  name: string;
}

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProject: string;
  setFilterProject: (project: string) => void;
  projects: Project[];
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  filterProject,
  setFilterProject,
  projects,
}: SearchBarProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce search query updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        setSearchQuery(localSearchQuery);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, searchQuery, setSearchQuery]);

  // Sync local state when external searchQuery changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    [],
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by unit name or number..."
          value={localSearchQuery}
          onChange={handleSearchChange}
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
            <SelectItem key={project.id} value={project.name}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
