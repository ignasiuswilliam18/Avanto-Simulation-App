interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-8">

      <h2
        className="
          flex
          items-center
          gap-2
          text-xl
          font-extrabold
          tracking-tight
          text-slate-900
        "
      >
        {title}
      </h2>


      {subtitle && (
        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-relaxed
            text-slate-500
          "
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}