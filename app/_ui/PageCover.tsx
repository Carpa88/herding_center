import Footer from './main-sections/Footer';
import Title from './Title';

const PageCover = ({
  children,
  title,
  href,
  name,
}: {
  children: React.ReactNode;
  title: string;
  href?: string;
  name?: string;
}) => (
  <>
    <Title title={title} href={href} name={name} />
    <main>
      <div className="mx-auto max-w-7xl px-4 py-0 sm:px-6 lg:px-8">
        <div className="bg-white py-6 px-4">{children}</div>
      </div>
    </main>
    <Footer />
  </>
);

export default PageCover;
