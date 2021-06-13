const Tour = require("../model/tour");

const fuzzySearch = (text) => {
    const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return new RegExp(regex, 'gi');
}

module.exports.getAllTour = (req, res) => {
    const { q } = req.query;
    const conditionFind = {};
    if (q) {
        conditionFind.tourName = fuzzySearch(q)
    }

    Tour.find(conditionFind)
        .then((tour) => {
            res.json(tour);
        })
        .catch((err) => {
            res.status(400).send(err)
        })
};

module.exports.addTour = async (req, res) => {
    try {
        let tour = new Tour(req.body);
        req.body.avatar = req.file.filename;
        await Tour.create(req.body);
        res.status(200).json({
            data : tour,
            message : "add tour successfully"
        })
    } catch (error) {
        res.status(400).json({
            error,
            message : "add tour fail"
        })
    }
};

module.exports.getTourID = async (req, res) => {
    try {
        let tourID = req.params.tourID;
        const tour = await Tour.findOne({ _id: tourID })
        res.status(200).json({
            data: tour,
            message : "get tour success"
        }) 
       
    } catch (error) {
        res.status(400).json({
            error,
            message : "get tour fail"
        }) 
    }
}

module.exports.updateTour = (req, res) => {
    let tourID = req.params.tourID;
    let updateTour = req.body;
    req.body.avatar = req.file.filename;
    Tour.findByIdAndUpdate({ _id: tourID }, { $set: updateTour })
    .then((tour) => {
        res.json(tour);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
};

module.exports.deleteTour = (req, res) => {
    let tourID = req.params.tourID;
    Tour.findByIdAndDelete({ _id: tourID })
        .then((tour) => {
            res.json(tour)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
}