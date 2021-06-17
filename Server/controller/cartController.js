var Cart = require("../model/cart");
const Tour = require("../model/tour");

module.exports.getCart = (req, res) => {
    let cart = Cart.find()
        .populate({ path: "userID" })
        .populate({ path: "tourInCart.tourID" })
        .then((cart) => {
            res.status(200);
            res.json(cart);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}
module.exports.getCartByUser = async (req, res) => {
    const userID = req.params.id
    await Cart.findOne({userID})
        .populate({ path: "userID" })
        .populate({ path: "tourInCart.tourID" })
        .then((cart) => {
            res.status(200);
            res.json({
                data: cart,
                payload : true,
                message: "successfully !",
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}
module.exports.addToCart = async (req, res) => {
    try {
        let userID = req.body.userID;
        let checkCartExiste = await Cart.findOne({ userID: userID });
        let currentQuality = await Tour.findOne({ _id: req.body.tourID })
        if (!checkCartExiste) {
            const cart = await Cart.create(req.body);
            await Cart.findOneAndUpdate({ userID }, {
                $push: {
                    tourInCart: {
                        tourID: req.body.tourID
                    }
                }
            })
            return res.status(200).json({
                data: cart,
                payload : true,
                message: "add cart successfully !",
            });
        } else {
            const cart = await Cart.findOneAndUpdate({ userID }, {
                $push: {
                    tourInCart: {
                        tourID: req.body.tourID
                    }
                }
            })
                .populate({ path: "userID" })
                .populate({ path: "tourInCart.tourID" });
            await Tour.findOneAndUpdate({ _id: req.body.tourID }, {
                qtyPeople: +(currentQuality.qtyPeople) - (+req.body.QtyPeople)
            })
            return res.status(200).json({
                data: cart,
                payload : true,
                message: "created cart successfully !",
            });
        }
    } catch (error) {
        return res.status(400).json({
          error,
          message: "created board fail !",
        });
    }
}

