
import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import axios from "axios"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { useShoppingCart, DebugCart } from "use-shopping-cart"
import { CartEntry as ICartEntry, formatCurrencyString } from "use-shopping-cart/core"

interface ProductProps {
    product: {
        sku: string;
        id: string;
        name: string;
        image: string;
        price: number;
        currency: 'BRL';
        description: string;
        defaultPriceId: string;
        

    }
}

export default function Product({ product }: ProductProps) {

    function teste({ entry }: { entry: ICartEntry }) {
        console.log(entry.name)
    }



    const { isFallback } = useRouter()
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { addItem, redirectToCheckout, clearCart } = useShoppingCart()



    async function handleBuyProduct() {


        try {
            const response = await axios.post('/api/checkout', { priceId: product.defaultPriceId } )
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
            <div>
                <img src="https://thumbs.gfycat.com/CorruptOldfashionedGuineapig-size_restricted.gif"></img>
                <h1>teste</h1>
            </div>

        )
    } else {

        return (
            <>

                <Head>
                    <title>
                        {product.name}
                    </title>
                </Head>
                <ProductContainer >
                    <ImageContainer>
                        <Image src={product.image} alt='' width={520} height={480} />
                    </ImageContainer>

                    <ProductDetails>
                        <h1>{product.name}</h1>

                        <span>{formatCurrencyString({ value: product.price, currency: 'BRL' })}</span>

                        <p>{product.description}</p>

                        <div>


                            <button disabled={isCreatingCheckoutSession} onClick={() => addItem?.(product)}>
                                Adicionar ao Carrinho
                            </button>
                            <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                                Comprar Agora
                            </button>
                        </div>

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
            product: {
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