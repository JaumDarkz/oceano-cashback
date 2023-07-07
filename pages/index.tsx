import Preloader from '@/components/PreLoader'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line semi
    setTimeout(() => {setLoading(true); window.open('/login', '_self')}, 1700)
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
    </>
  )
}
