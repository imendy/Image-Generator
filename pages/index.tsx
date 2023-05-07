import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Form from '../components/Form'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Image-Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        <Form 
          className=""
          />
        <Footer />
     
    </div>
  )
}

export default Home