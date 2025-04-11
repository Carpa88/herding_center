const Section = ({
  children,
  title,
  description,
  cols,
  border = true,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cols?: 1 | 2;
  border?: boolean;
}) => (
  <div className={border ? 'border-b border-slate-900/10 pb-5' : 'pb-5'}>
    {title ? (
      <h2 className="text-base/7 font-semibold text-textPrimary">{title}</h2>
    ) : null}
    {description ? (
      <p className="mt-1 text-sm/6 text-textSecondary">{description}</p>
    ) : null}
    <div
      className={`mt-5 grid grid-cols-1 md:grid-cols-${cols || 2} gap-x-6 gap-y-8`}
    >
      {children}
    </div>
  </div>
);

export default Section;
