import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import FieldNotes from '../components/FieldNotes'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import usePageTitle from '../usePageTitle'

// Strongest proof first: work, then where it was done, then supporting detail.
// Keep `nav` in src/data/content.js in the same order.
export default function Home() {
  usePageTitle()
  return (
    <>
      <Navbar />
      <Hero />
      <Projects number="01" />
      <Experience number="02" />
      <Skills number="03" />
      <About number="04" />
      <FieldNotes number="05" />
      <Contact number="06" />
      <Footer />
    </>
  )
}
