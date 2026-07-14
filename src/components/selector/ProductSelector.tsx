import SearchableSelect from "./SearchableSelect";

interface ProductOption {
  label: string;
  value: string;
}

interface ProductSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: ProductOption[];
}

export default function ProductSelector({
  value,
  onChange,
  options,
}: ProductSelectorProps) {
  return (
    <SearchableSelect
      label="Produk HP"
      placeholder="Cari produk OPPO..."
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}