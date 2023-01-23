const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MSwkpGwlfcZW5ChhHzHAmviosB6Z9mw7DoGFibSu5i1payHscvPA5JHVAqJnemCaYc4OCF5WZNdtvMdPoqbDCMG009lUXgOtN');

app.post('/checkout', async (req, res, next) => {

    try {
        const items = JSON.stringify(req.body.items);
        const obj = req.body.items
        //console.log('Dentro do TRY', Object.getOwnPropertyNames(obj.body.items[0].price))

        if(req !== null){

            const session = await stripe.checkout.sessions.create({

                payment_method_types: ['card'],
                shipping_address_collection: {allowed_countries: ['US', 'CA']},
                shipping_options: [
                    {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {amount: 0, currency: 'usd'},
                        display_name: 'Free shipping',
                        delivery_estimate: {
                        minimum: {unit: 'business_day', value: 5},
                        maximum: {unit: 'business_day', value: 7},
                        },
                    },
                    },
                ],
                line_items: obj.
                map((item) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,   
                            images: [item.product]
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                })),
                mode: 'payment',
                success_url: 'http://localhost:4242/success.html',
                cancel_url: 'http://localhost:4242/cancel.html',
    
              
            });
            res.status(200).json(session);

        }

    } catch (error) {
        next(error);
        res.status(500).json({error:error.message})
    }
        
});

app.listen(4242, () => console.log('The App is running on http://localhost:4242'));