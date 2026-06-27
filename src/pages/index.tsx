import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import Solutions from '@/components/Solutions'
import WhyTrustLayer from '@/components/WhyTrustLayer'
import TechnologySection from '@/components/TechnologySection'
import BlogSection from '@/components/BlogSection'  // ✅ Must be imported
import PartnershipCTA from '@/components/PartnershipCTA'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <Solutions />
      <WhyTrustLayer />
      <TechnologySection />
      <BlogSection />  {/* ✅ Must be included here */}
      <PartnershipCTA />
    </Layout>
  )
}