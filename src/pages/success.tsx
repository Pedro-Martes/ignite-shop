import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
    customerName: string;
    product: [{
        name: string;
        imageUrl: string;
    }]
}

export default function Success({ customerName, product }: SuccessProps) {
    const {  clearCart } = useShoppingCart();
    clearCart();
    console.log(product);
    return (
        
        <>
        
    <Head>
      <title>
        Sucesso! | Next Shop
      </title>

      <meta name="robots" content="noindex"/>
    </Head>
        <SuccessContainer>
            <h1><strong>EBA!</strong> Compra Efetuado com sucesso!</h1>


            <Link href={'/'}>
                Voltar a pagina incial
            </Link>
        
        </SuccessContainer>

        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
    const sessionId = String(query.session_id);

    if(!query.session_id) {
        return { 
           redirect:{
            destination: '/',
            permanent: false,
        
           }
        }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    })
    
    const customerName = session.customer_details?.name;
    const products = session.line_items?.data[0].price?.product as Stripe.Product

    console.log('o teste:'+JSON.stringify(session.line_items?.data[0].price?.product))
    
    return {
        props: {
            customerName,
           
        },
        


    }
}