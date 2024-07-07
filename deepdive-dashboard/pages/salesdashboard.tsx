import Head from 'next/head'

import SalesDashboardComponent from '@/components/SalesDashboard'

export default function SalesDashboard () {
  return (
    <>
      <Head>
        <title>Oceano Deep Dive</title>
        <meta name="description" content="Oceano Deep Dive a Plataforma de pontos oficial do Oceano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SalesDashboardComponent />
    </>
  )
}
