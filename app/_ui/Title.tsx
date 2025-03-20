const Title = ({ title }: { title: string }) => (
  <header className="relative z-10 bg-bgDefault shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className={'text-3xl font-bold tracking-tight text-textPrimary'}>
        {title}
      </h1>
    </div>
  </header>
);

export default Title;
