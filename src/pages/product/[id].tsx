
import { stripe } from "@/src/lib/stripe"
import { ButtonsContainer, ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { useShoppingCart, DebugCart } from "use-shopping-cart"
import { formatCurrencyString } from "use-shopping-cart/core"

interface ProductProps {
    CurrencyProduct: {
        sku: string;
        id: string;
        name: string;
        image: string;
        price: number;
        currency: 'BRL';
        description: string;
        defaultPriceId: string;
        quantity: 1;


    }
}

export default function Product({ CurrencyProduct }: ProductProps) {





    const { isFallback } = useRouter()
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { addItem } = useShoppingCart()



    async function handleBuyProduct() {


        try {
            const response = await axios.post('/api/checkout', { product:CurrencyProduct})
            const { checkoutUrl } = response.data

            setIsCreatingCheckoutSession(true)


            window.location.href = checkoutUrl
        } catch (error) {
            //datadog
            setIsCreatingCheckoutSession(false)
            alert("Falha ao finalizar o checkout")
        }

    }

    if (isFallback) {
        return (
            <>

                <ProductContainer  >
                    <ImageContainer>
                    <Player
                    autoplay
                    loop
                    src= 'https://assets9.lottiefiles.com/packages/lf20_PevhfMBroe.json'
                    style={{ height: '520px', width: '480px' }}
                    
                   />
                    </ImageContainer>


                    <ProductDetails>

                    <Player
                    autoplay
                    loop
                    src= 'https://assets3.lottiefiles.com/packages/lf20_lmaNPc.json'
                    style={{ height: '520px', width: '480px' }}
                    
                   />
                    </ProductDetails>
                </ProductContainer>
            </>

        )
    } else {

        return (
            <>

                <Head>
                    <title>
                        {CurrencyProduct.name}
                    </title>
                </Head>
                <ProductContainer  >
                    <ImageContainer>
                        <Image src={CurrencyProduct.image} alt='' width={520} height={480} />
                    </ImageContainer>

                    <ProductDetails>
                        <h1>{CurrencyProduct.name}</h1>

                        <span>{formatCurrencyString({ value: CurrencyProduct.price, currency: 'BRL' })}</span>

                        <p>{CurrencyProduct.description}</p>

                        <ButtonsContainer>


                            <button disabled={isCreatingCheckoutSession} onClick={() => addItem?.(CurrencyProduct)}>
                                Adicionar ao Carrinho
                            </button>
                         
                        </ButtonsContainer>

                    </ProductDetails>
                </ProductContainer>



            </>
        )
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NUvQVKx52WNKoS' } }
        ],
        fallback: true,
    }


}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params?.id ? params.id : ''

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price


    return {
        props: {
            CurrencyProduct: {
                id: product.id,
                name: product.name,
                image: product.images[0],
                description: product.description,
                price: price.unit_amount,
                defaultPriceId: price.id,




            }
        },
        revalidate: 60 * 60 * 1  //1 hour
    }


}