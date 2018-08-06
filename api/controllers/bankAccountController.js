'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_bankAccounts = function(req, res) {
    let user_id = req.query.userID;
    let param = {
        limit: req.query.limit || 10,
        object: "bank_account"
    };

    stripe.customers.listSources(
        user_id,
        param,
        function(err, bank_accounts) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(bank_accounts);
            }
        }
    );
};


exports.create_a_bankAccount = function(req, res) {
    stripe.tokens.create({
        bank_account: {
            country: req.body.country,
            currency: req.body.currency,
            account_holder_name: req.body.account_holder_name,
            account_holder_type: req.body.account_holder_type,
            routing_number: req.body.routing_number,
            account_number: req.body.account_number
        }
    }, function(err, token) {
        // asynchronously called
        if(err) {
            console.log(err);
            res('REQUEST ERROR');
        } else {
            let userID = req.body.user_id;
            let param = {
                source: token
            };

            stripe.customers.createSource(
                userID,
                param,
                function(err, bank_account) {
                    // asynchronously called
                    if(err) {
                        console.log(err);
                        res('REQUEST ERROR');
                    } else {
                        res.json(bank_account);
                    }
                }
            );
        }
    });

};


exports.read_a_bankAccount = function(req, res) {
    let userID = req.body.user_id;
    let bankAccountID = req.body.bank_account_id;

    stripe.customers.retrieveCard(
        userID,
        bankAccountID,
        function(err, external_account) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(external_account);
            }
        }
    );
};


exports.update_a_bankAccount = function(req, res) {
    let userID = req.body.user_id;
    let bankAccountID = req.body.bank_account_id;
    let param = {};

    stripe.customers.updateCard(
        userID,
        bankAccountID,
        param,
        function(err, bank_account) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(bank_account);
            }
        }
    );
};


exports.delete_a_bankAccount = function(req, res) {
    let userID = req.body.user_id;
    let bankAccountID = req.body.bank_account_id;

    stripe.customers.deleteSource(
        userID,
        bankAccountID,
        function(err, confirmation) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(confirmation);
            }
        }
    );
};
