import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}