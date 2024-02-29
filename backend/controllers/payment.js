const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  //secret key for backend

// To initiate payment using stripe
exports.processpayment = async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        source: req.body.tokenId, //for every payment stripe must return a tokenId
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        },        
    },(stripeErr, stripeRes)=>{
        if(stripeErr) return res.status(500).json({stripeErr});
        if(stripeRes) {
            res.status(200).json({success:true, client_secret:myPayment.client_secret})
        }
    });
}
exports.sendStripeApikey = async(req,res,next) =>{
    res.status(200).json({stripeApikey:process.env.STRIPE_API_KEY}); //publish key for frontend
}