module.exports = app => {
    const purchase = require("../controllers/purchase.controller.js");
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, 'uploads/');
        },
        filename: function(req, file, callback) {
            var re = /(?:\.([^.]+))?$/;
            callback(null, Math.floor((Math.random() * 10000) + 1).toString() + Date.now() + '.' + re.exec(file.originalname)[1]);
        }
    });

    var upload = multer({
        storage: storage
    }).single('logoOfBrand');

    // create purchase
    app.post("/purchase/create", upload, purchase.create);
    app.post("/purchase/update", upload, purchase.update);
    app.get("/Item/List", upload, purchase.itemList);
    app.get("/purchase/List", upload, purchase.purchaseList);
};