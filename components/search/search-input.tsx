import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchBox } from "react-instantsearch";

interface CustomSearchBoxProps {
  currentRefinement: string;
  refine: (value: string) => void;
}
// todo: separate search input and searcbox?
export const SearchInput = () => {
  const { refine } = useSearchBox();
  return (
    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form noValidate action="" role="search">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            onChange={(event) => {
              refine(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Delete" || event.key === "Backspace") {
                event.stopPropagation();
              }
            }}
            placeholder="Search"
            className="pl-8"
          />
        </div>
      </form>
    </div>
  );
};
