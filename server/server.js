
const express = require("express");
const app = express();
const cors = require("cors");
const stripe=require("stripe")("sk_test_51OB9TcSB3m3uX2353mSqmoSEYTv8KheGRWIiI3Qf3D7XUR01osjMrEw5ciPfECt9hu1fwP5wjZaqwTSUuOPWUrvP00vN22vr2O")
const port=5000;

app.use(express.json());
app.use(cors());

//checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
    // console.log(products)


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title,
                
                // images:[product.Image]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    })
    );

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/",
        cancel_url:"http://localhost:3000/cancel",
    });
    // app.get('/success', async (req, res) => {
    //     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //     const customer = await stripe.customers.retrieve(session.customer);
      
    //     res.send(`<html>
    //     <body><h1>Thanks for your order, ${customer.name}!</h1>
    //     <button>Complete Order</button>
    //     </body>
    //     </html>`);
    //   });

    res.json({id:session.id})
    // console.log(session.id)
})


app.listen(port,()=>{
    console.log(`server running on ${port}`)
})