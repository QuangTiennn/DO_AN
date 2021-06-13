const Employee = require("../model/employee");

module.exports.getAllEmployee = (req,res) => {
    Employee.find()
    .then((employee) => {
        res.json(employee);
    })
    .catch((err)=> {
        res.status(400).send(err)
    })
};

module.exports.addEmployee = async(req, res) => {
    try {
        let employee = new Employee(req.body);
        req.body.avatar = req.file.filename;
        await Employee.create(req.body);
        res.status(200).json({
            data : employee,
            message : "add employee successfully"
        })
    } catch (error) {
        res.status(400).json({
            error,
            message : "add employee fail"
        })
    }
};

module.exports.getEmployeeID = (req, res) => {
    let employeeID = req.params.employeeID;
    Employee.findOne({_id : employeeID})
    .then((employee) => {
        res.json(employee)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
}

module.exports.updateEmployee = (req, res) => {
    let employeeID  = req.params.employeeID;
    let updateEmployee = req.body;
    req.body.avatar = req.file.filename;
    Employee.findByIdAndUpdate({_id : employeeID}, {$set : updateEmployee})
    .then((employee) => {
        res.json(employee);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
};

module.exports.deleteEmployee = (req, res) => {
    let employeeID = req.params.employeeID;
    Employee.findByIdAndDelete({_id : employeeID})
    .then((employee) => {
        res.json(employee)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
}