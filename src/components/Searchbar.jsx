import { Input } from "@/components/ui/input";

function SearchBar({ value, onChange }) {
  return (
    <Input
      placeholder="Search Product..."
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBar;