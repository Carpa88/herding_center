const Section = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <div className="border-b border-slate-900/10 pb-5">
      {!!title && <h2 className="text-base/7 font-semibold text-slate-900">{title}</h2>}
      {!!description && (
        <p className="mt-1 text-sm/6 text-slate-600">{description}</p>
      )}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {children}
      </div>
    </div>
  );
};

export default Section;
