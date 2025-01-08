import Footer from './main-sections/Footer';
import Title from './Title'

const PageCover = ({children, title}: {children: React.ReactNode; title: string}) => {
  return (
    <>
      <Title title={title} />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className='bg-white'>
            {children}
          </div>
        </div>
      </main>
      <Footer />
      </>
  )
}

export default PageCover