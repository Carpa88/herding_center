import '@app/globals.css';
import Nav from './_ui/navigation/Nav';
import { Providers } from './_ui/Providers';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html className="h-full bg-bgSuperLight" lang="en">
    <body className={'antialiased h-full'}>
      <div className="flex flex-col min-h-screen">
        <Providers>
          <Nav />
          {children}
        </Providers>
      </div>
    </body>
  </html>
);

export default RootLayout;
