import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FilterIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface Filter {
  tag: string;
  name: string;
}

const FilterModal = () => {
  const [filter, setFilter] = useState({
    tag: "",
    name: "",
  });
  // const params = useParams();
  const router = useRouter();

  // create a filter functin to add to the url with query params
  const handleSetFilter = () => {
    const { tag, name } = filter;
    const query = {
      ...(tag && { tag }),
      ...(name && { name }),
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/libs?${queryString}`);
  };

  const handleSetClearFilter = () => {
    setFilter({
      tag: "",
      name: "",
    });
    router.push("/libs");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Filter
          <FilterIcon className="size-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter for libraries</DialogTitle>
          <DialogDescription>
            Filter the libraries by the tags below
          </DialogDescription>
          <div>
            <div className="flex flex-col gap-3">
              <h3>Search for a tag or a library</h3>
              <Label htmlFor="lib_name">Library Name</Label>
              <Input
                id="lib_name"
                onChange={(e) => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    name: e.target.value,
                  }));
                }}
              />
              <Label htmlFor="lib_tag">Tag Name</Label>
              <Input
                id="lib_tag"
                onChange={(e) => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    tag: e.target.value,
                  }));
                }}
              />
              <div className="flex items-center gap-3">
                <Button className="w-full" onClick={handleSetFilter}>Filter</Button>
                <Button className="w-full" variant="destructive" onClick={handleSetClearFilter}>
                  Clear
                  <Trash2 className="text-foreground size-5 pl-1"/>
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
