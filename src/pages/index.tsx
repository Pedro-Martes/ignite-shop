import { styled } from "../styles"
import Image from "next/image"
import Head from "next/head"
import { HomeContainer, Navigation, Product } from "../styles/pages/home"
import camiseta1 from '../assets/shirts/1.png'
import camiseta2 from '../assets/shirts/2.png'
import camiseta3 from '../assets/shirts/3.png'
import camiseta4 from '../assets/shirts/4.png'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css';
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import { useState } from "react"
import { CaretRight, CaretLeft } from "phosphor-react"



interface HomeProps {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
  }[]
}

export default function Home({ products }: HomeProps) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      perView: 3.2,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <>

      <Head>
        <title>
          Home | Next Shop
        </title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>


        {products.map(product => {
          return (
            <div key={product.id}>
              <Link
                href={'product/' + product.id}
                key={product.id}
                prefetch={false}>

                <Product

                  className="keen-slider__slide">
                  <Image src={product.image} width={520} height={480} alt='' priority={true} />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>

                </Product>

              </Link>

            </div>
          )
        })}

      </HomeContainer>

      <Navigation>
        <span>
        <CaretLeft
         
          size={32}
          weight="bold"
          onClick={() => instanceRef.current?.prev()}
        />
        </span>
        
        <span>
        <CaretRight
          size={32}
          weight="bold"
          onClick={() => instanceRef.current?.next()}
        />
        </span>
      </Navigation>

    </>
  )

}


export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price',]
  })



  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',

      }).format(price?.unit_amount ? price.unit_amount / 100 : 0)

    }
  })

  return {
    props: {
      products,
    },
    revalidate: 7200 // a cada 2 hours
  }
}




