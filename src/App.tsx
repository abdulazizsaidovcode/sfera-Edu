import BlurIn from './components/magicui/blur-in'
import Marquee from './components/magicui/marquee'
import ShinyButton from './components/magicui/shiny-button'
import SparklesText from './components/magicui/sparkles-text'
import TextRevealByWord from './components/magicui/text-reveal'

function App() {

  return (
    <>
      hello
      <BlurIn word={"Hello World"}></BlurIn>
      <ShinyButton text='hello'></ShinyButton>
      <TextRevealByWord text='hello my name is good boy'></TextRevealByWord>
      <SparklesText text='salom jigarla' />
      ddd <Marquee />
    </>
  )
}

export default App
