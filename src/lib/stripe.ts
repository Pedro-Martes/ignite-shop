import Stripe from "stripe";

if(process.env.STRIPE_SECRET_KEY !== undefined){
    
}
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '',{
    apiVersion: '2022-11-15',
    appInfo:{
        name: 'Next Shop'
    }
})