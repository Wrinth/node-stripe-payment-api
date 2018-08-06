let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    //mongoose = require('mongoose'),
    //Payment = require('./api/models/paymentModel'), //created model loading here
    bodyParser = require('body-parser');


// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Paymentdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let routes = require('./api/routes/populStayTransactionRoutes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);


console.log('Payment RESTful API server started on: ' + port);