import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { AccountProvider } from '@/contexts/accountContext'
import { ProductsProvider } from '@/contexts/productContext'
import { CartProvider } from '@/contexts/cartContext'
import StatusProvider from '@/contexts/statusUpdater'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StatusProvider>
        <AccountProvider>
          <ProductsProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </ProductsProvider>
        </AccountProvider>
      </StatusProvider>
    </>
  )
}
