import { useEffect, useState } from 'react'
import Head from 'next/head'

import LandingPage from '@/components/LandingPage'
import Preloader from '@/components/PreLoader'

export default function Home () {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line semi
    setTimeout(() => {setLoading(true)}, 1700)
  }, [])

  return (
    <>
      <Head>
        <title>Oceano Deep Dive</title>
        <meta name="description" content="Oceano Deep Dive a Plataforma de pontos oficial da Oceano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loading ? (
        <Preloader />
      ) : null}

      <LandingPage />
    </>
  )
}
