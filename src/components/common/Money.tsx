interface MoneyProps {
  value: number;
}

export default function Money({
  value,
}: MoneyProps) {
  return (
    <>
      Rp{" "}
      {value.toLocaleString("id-ID")}
    </>
  );
}