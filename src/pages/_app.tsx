
import type { AppProps } from 'next/app'
import { globalStyle } from '../styles/global'

import logoImg from '../assets/logo.png'
import {  Container, Header } from '../styles/pages/app';

import Image from 'next/image';
import Link from 'next/link';

import CartMenu from './utils/cartDropDown';
import { CartProvider } from 'use-shopping-cart';


export default function App({ Component, pageProps }: AppProps) {
    globalStyle();
const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    return (
        <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe= {process.env.STRIPE_SECRET_KEY ?? ''}
        successUrl= {successUrl}
        cancelUrl="twitter.com/dayhaysoos"
        currency="BRL"
        allowedCountries={['US', 'GB', 'CA']}
        billingAddressCollection={true}
        shouldPersist
       >
        <Container>
            <Header>

                <Link href={'/'}>
                    <Image src={logoImg} alt="logo" />
                </Link>

                  <CartMenu />

            </Header>
            <Component {...pageProps} />
        </Container>

        </CartProvider>
    )
}
