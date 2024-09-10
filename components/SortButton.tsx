"use client";

import { ArrowUpDown, Pin } from "lucide-react";
import SortState from "@/store/sortStore";

const SortButton = () => {
  const { isSort, onToggleSort } = SortState();
  const handleToggleSort = () => {
    console.log(isSort);

    onToggleSort(!isSort);
  };
  return isSort ? (
    <Pin onClick={handleToggleSort} />
  ) : (
    <ArrowUpDown onClick={handleToggleSort} />
  );
};

export default SortButton;
