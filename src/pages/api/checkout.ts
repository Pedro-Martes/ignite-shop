import { stripe } from '@/src/lib/stripe';
import type { NextApiRequest, NextApiResponse } from 'next'
import { useShoppingCart } from 'use-shopping-cart';

interface Iproduct{
 
  currency: 'BRL';
  price: string;
  quantity: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 
 const {products } = req.body as {products: Iproduct[] }
  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_URL}/`


  console.log('teste:'+products)

  const checkoutCartSession = await stripe.checkout.sessions.create({
    
    success_url: success_url ,
    cancel_url: cancel_url,

    mode: 'payment',
    line_items: products.map((product) => ({
        price: product.price,
        quantity: product.quantity,
      
      }))
    })
      
    



  if(req.method !== 'POST'){
    return res.status(405).json({error: 'Method Not Allowed'})
  }

  if(!products){
    return res.status(400).json({error: 'Price id not found.'})
  }

  return res.status(201).json({
   checkoutUrl: checkoutCartSession.url ?? ''

  })
  

}
