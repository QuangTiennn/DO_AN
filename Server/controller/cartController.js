var Cart = require("../model/cart");
const Tour = require("../model/tour");

module.exports.getCart = (req, res) => {
    let cart = Cart.find()
        .then((cart) => {
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
    let checkCartExiste = await Cart.findOne({ userID });
    let currentQuality = await Tour.findOne({ tourID: req.body.tourID })

    if (checkCartExiste) {
        await Cart.findOneAndUpdate({ userID }), {
            $push: {
                tourInCart: cart.tourInCart
            }
        }
        await Tour.findOneAndUpdate({ tourID: req.body.tourID }, { qtyPeople: +(currentQuality.qtyPeople) - (+req.body.QtyPeople) })
        res.json(cart).status(200);
    } else {
        cart.save()
            .then((cart) => {
                res.status(200)
                res.json(cart)
            })
            .catch((err) => {
                res.status(400).send(err)
            })
    }
}

