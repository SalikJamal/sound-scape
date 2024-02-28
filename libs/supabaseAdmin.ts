import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/types_db"
import { IPrice, IProduct } from "@/types/types"
import { stripe } from "@/libs/stripe"
import { toDateTime } from "@/libs/helpers"


const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)


export const upsertProductRecord = async (product: Stripe.Product) => {
    const productdata: IProduct = {
        id: product.id,
        active: product.active,
        description: product.description ?? undefined,
        image: product.images[0] ?? null,
        metadata: product.metadata
    }

    const { error } = await supabaseAdmin.from("products").upsert([productdata])
    if(error) throw error

    console.log(`Product inserted/updated: ${product.id}`)
}


export const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: IPrice = {
        id: price.id,
        product_id: typeof price.product === "string" ? price.product : "",
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days,
        metadata: price.metadata
    }

    const { error } = await supabaseAdmin.from("prices").upsert([priceData])
    if(error) throw error

    console.log(`Price inserted/updated: ${price.id}`)
}


export const createOrRetrieveCustomer = async ({ email, uuid }: { email: string, uuid: string }) => {
    const { data, error } = await supabaseAdmin
        .from("customers")
        .select("stripe_customer_id")
        .eq("id", uuid)
        .single()

    if(error || !data?.stripe_customer_id) {
        const customerData: { metadata: { supabaseUUID: string }, email?: string } = {
            metadata: { supabaseUUID: uuid }
        }

        if(email) customerData.email = email

        const customer = await stripe.customers.create(customerData)
        const { error: supabaseError } = await supabaseAdmin
            .from("customers")
            .insert([{ id: uuid, stripe_customer_id: customer.id }])

        if(supabaseError) throw supabaseError

        console.log(`New customer created and inserted for: ${uuid}`)

        return customer.id
    }

    return data.stripe_customer_id
}


export const copyBillingDetailsToCustomer = async (uuid: string, paymentMethod: Stripe.PaymentMethod) => {
    const customer = paymentMethod.customer as string
    const { name, phone, address } = paymentMethod.billing_details

    if(!name || !phone || !address) return

    // @ts-ignore
    await stripe.customers.update(customer, { name, phone, address })

    const { error } = await supabaseAdmin
        .from("users")
        .update({
            billing_address: { ...address },
            payment_method: { ...paymentMethod[paymentMethod.type] } 
        })
        .eq("id", uuid)

    if(error) throw error
}


export const manageSubscriptionChange = async (subscriptionId: string, customerId: string, createAction = false) => {
    const { data: customerData, error: noCustomerError } = await supabaseAdmin
        .from("customers")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()
        
    if(noCustomerError) throw noCustomerError

    const { id: uuid } = customerData!
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ["default_payment_method"] })
    const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] = {
        id: subscription.id,
        user_id: uuid,
        metadata: subscription.metadata,
        // @ts-ignore
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        // @ts-ignore
        quantity: subscription.quantity,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
        canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
        current_period_start: toDateTime(subscription.current_period_start).toISOString(),
        current_period_end: toDateTime(subscription.current_period_end).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
        trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
        trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
    }

    const { error } = await supabaseAdmin
        .from("subscriptions")
        .upsert([subscriptionData])

    if(error) throw error

    console.log(`Subscription inserted/updated: [${subscription.id} for ${uuid}]`)

    if(createAction && subscription.default_payment_method && uuid) {
        await copyBillingDetailsToCustomer(uuid, subscription.default_payment_method as Stripe.PaymentMethod)
    }
}