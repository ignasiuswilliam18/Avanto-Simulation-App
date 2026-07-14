import {
  HP_PRODUCTS,
  OPPO_CARE_PRODUCTS,
  IOT_PRODUCTS,
  type ProductItem,
} from "../data";

export default function ProductPanel({
  selectedModel,
  setSelectedModel,
  selectedOppoCare,
  setSelectedOppoCare,
  selectedIot,
  setSelectedIot,
}: any) {
  return (
    <div className="space-y-3">

      {/* HP */}
      <select
        className="w-full border p-2 rounded"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {HP_PRODUCTS.map((p: ProductItem, i) => (
          <option key={i} value={p.model}>
            {p.model}
          </option>
        ))}
      </select>

      {/* OPPO CARE */}
      <select
        className="w-full border p-2 rounded"
        value={selectedOppoCare ?? ""}
        onChange={(e) =>
          setSelectedOppoCare(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
      >
        <option value="">+ OPPO CARE (optional)</option>

        {OPPO_CARE_PRODUCTS.map((p, i) => (
          <option key={i} value={i}>
            {p.model}
          </option>
        ))}
      </select>

      {/* IOT */}
      <select
        className="w-full border p-2 rounded"
        value={selectedIot ?? ""}
        onChange={(e) =>
          setSelectedIot(
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
      >
        <option value="">+ IOT (optional)</option>

        {IOT_PRODUCTS.map((p, i) => (
          <option key={i} value={i}>
            {p.model}
          </option>
        ))}
      </select>
    </div>
  );
}