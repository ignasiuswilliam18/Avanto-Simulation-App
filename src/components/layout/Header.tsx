import avantoLogo from "../../assets/logos/avanto.png";
import oppoLogo from "../../assets/logos/oppo.png";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = "AVANTO",
  subtitle = "OPPO Official Financing Simulator",
}: HeaderProps) {
  return (
    <header className="mb-10">

      <div className="flex flex-col items-center">

        <img
          src={avantoLogo}
          alt="Avanto"
          className="h-20 object-contain"
        />

        <p className="mt-5 text-lg font-semibold text-slate-700">
          {subtitle}
        </p>

        <img
          src={oppoLogo}
          alt="OPPO"
          className="mt-6 h-10 object-contain"
        />

      </div>

    </header>
  );
}