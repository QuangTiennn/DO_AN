var Cart = require("../model/cart");

module.exports.getCart = (req,res) => {
    let cart = Cart.find()
    .then((cart)=> {
        res.status(200);
       res.json(cart);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}

module.exports.addToCart = async (req, res) => {
    let cart = new Cart(req.body);
    let userID = req.body.userID;
    let checkCartExiste = await Cart.findOne({userID});
    if(checkCartExiste) {
        await Cart.findOneAndUpdate({userID : userID}),{
            $push : {
                tourInCart : cart.tourInCart
            }
        }
        res.json(cart).status(200);
    }else {
        cart.save()
        .then((cart)=>{
            res.status(200)
           res.json(cart)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
    }
}

