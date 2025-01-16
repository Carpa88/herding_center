import '@app/globals.css';
import Nav from './_ui/navigation/Nav';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html className="h-full bg-slate-100" lang="en">
    <body className={'antialiased h-full'}>
      <div className="min-h-full">
        <Nav />
        {children}
      </div>
    </body>
  </html>
);

export default RootLayout;
