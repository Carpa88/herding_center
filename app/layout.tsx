import '@app/globals.css';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html className="h-full bg-slate-100" lang="en">
      <body className={`antialiased h-full`}>
        <div className="min-h-full">
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;