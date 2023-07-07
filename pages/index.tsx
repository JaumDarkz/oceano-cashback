import Head from 'next/head'
import { useEffect } from 'react'

export default function Home () {
  useEffect(() => {
    window.open('/login', '_self')
  }, [])

  return (
    <>
      <Head>
        <title>Oceano Deep Dive</title>
        <meta name="description" content="Oceano Deep Dive a Plataforma de pontos oficial da Oceano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
