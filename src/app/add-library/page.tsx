import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const AddLibrary = () => {
  return (
    <form className="flex flex-col gap-5 p-40 h-screen">
      <h1 className="text-4xl font-semibold">Add new Library</h1>
      <div className="flex border p-5 rounded-lg gap-5 ">
        <div className="w-full flex flex-col gap-5">
          <Label htmlFor="name" className="text-base font-medium ">Library Name</Label>
          <Input type="text" placeholder="Library name" id="name" />
          <Label htmlFor="name" className="text-base font-medium ">Library description</Label>
          <Input type="text" placeholder="Library description" />
          <Label htmlFor="name" className="text-base font-medium ">Library image</Label>
          <Input type="file" placeholder="Library image" />
          <Label htmlFor="name" className="text-base font-medium ">Library Github</Label>
          <Input type="text" placeholder="Library Github" />
        </div>
        <div className="w-full flex flex-col gap-5">
          <Label htmlFor="name" className="text-base font-medium ">Library stars</Label>
          <Input type="text" placeholder="Library stars" />
          <Label htmlFor="name" className="text-base font-medium ">Library documentation</Label>
          <Input type="text" placeholder="Library documentation" />
          <Label htmlFor="name" className="text-base font-medium ">Library tags</Label>
          <Input type="text" placeholder="Library tags" />
        </div>
      </div>

      <Button className="w-fit text-lg font-medium">Save Library</Button>
    </form>
  );
};

export default AddLibrary;
