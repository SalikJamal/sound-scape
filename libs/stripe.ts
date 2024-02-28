import Stripe from 'stripe'


export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
    appInfo: {
        name: "Soundscape",
        version: "0.1.0"
    }
})