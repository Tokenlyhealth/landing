import { CallToAction } from '../sections/CallToAction'
import { Contact } from '../sections/Contact'
import { CustomDevelopment } from '../sections/CustomDevelopment'
import { Deployment } from '../sections/Deployment'
import { Engagement } from '../sections/Engagement'
import { Hero } from '../sections/Hero'
import { HowWeWork } from '../sections/HowWeWork'
import { Industries } from '../sections/Industries'
import { Problems } from '../sections/Problems'
import { Solutions } from '../sections/Solutions'
import { WhyUs } from '../sections/WhyUs'

export function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <Problems />
      <Solutions />
      <CustomDevelopment />
      <Engagement />
      <Deployment />
      <HowWeWork />
      <WhyUs />
      <CallToAction />
      <Contact />
    </>
  )
}
