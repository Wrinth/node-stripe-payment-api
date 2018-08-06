'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_users = function(req, res) {
    let param = {
        limit: req.query.limit || 10
    };

    stripe.customers.list(
        param,
        function(err, customers) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(customers);
            }
        }
    );
};


exports.create_a_user = function(req, res) {
    let param = {
        email: req.body.email,
        metadata: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    };

    stripe.customers.create(
        param,
        function(err, customers) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(customers);
            }
        }
    );

};


exports.read_a_user = function(req, res) {
    let userID = req.params.userId;

    stripe.customers.retrieve(
        userID,
        function(err, customer) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(customer);
            }
        }
    );
};


exports.update_a_user = function(req, res) {
    let userID = req.params.userId;
    let param = {};
    if(req.body.account_balance) {
        param.account_balance = req.body.account_balance;
    }
    if(req.body.description) {
        param.description = req.body.description;
    }
    if(req.body.email) {
        param.email = req.body.email;
    }
    if(req.body.first_name) {
        param.metadata = param.metadata || {};
        param.metadata.first_name = req.body.first_name;
    }
    if(req.body.last_name) {
        param.metadata = param.metadata || {};
        param.metadata.last_name = req.body.last_name;
    }

    stripe.customers.update(
        userID,
        param,
        function(err, customer) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(customer);
            }
    });
};


exports.delete_a_user = function(req, res) {
    let userID = req.params.userId;

    stripe.customers.del(
        userID,
        function(err, confirmation) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(customer);
            }
        }
    );
};
