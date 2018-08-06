'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_payouts = function(req, res) {
    let param = {
        limit: req.query.limit || 10
    };

    stripe.payouts.list(
        param,
        function(err, payouts) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(payouts);
            }
        }
    );
};


exports.create_a_payout = function(req, res) {
    let param = {
        amount: req.body.amount,
        currency: req.body.curreny,
        destination: req.body.destination_id,
        description: req.body.description || ""
    };

    stripe.payouts.create(
        param,
        function(err, payout) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(payout);
            }
        }
    );
};


exports.read_a_payout = function(req, res) {
    let payoutID = req.params.payoutId;

    stripe.payouts.retrieve(
        payoutID,
        function(err, payout) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(payout);
            }
        }
    );
};


exports.cancel_a_payout = function(req, res) {
    let payoutID = req.params.payoutId;

    stripe.payouts.cancel(
        payoutID,
        function(err, payout) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(payout);
            }
        }
    );
};
