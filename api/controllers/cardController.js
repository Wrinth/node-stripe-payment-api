'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_cards = function(req, res) {
    let user_id = req.query.userID;
    let param = {
        limit: req.query.limit || 10
    };

    stripe.customers.listCards(
        user_id,
        param,
        function(err, cards) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(cards);
            }
        }
    );
};


exports.create_a_card = function(req, res) {
    stripe.tokens.create({
        card: {
            "number": req.body.card_number.toString(),
            "exp_month": parseInt(req.body.exp_month),
            "exp_year": parseInt(req.body.exp_year),
            "cvc": req.body.cvc,
            "name": req.body.name || "",
            "address_line1": req.body.address_line1 || "",
            "address_line2": req.body.address_line2 || "",
            "address_city": req.body.address_city || "",
            "address_state": req.body.address_state || "",
            "address_zip": req.body.address_zip || "",
            "address_country": req.body.address_country || ""
        }
    }, function(err, token) {
        // asynchronously called
        if(err) {
            console.log(err);
            res('REQUEST ERROR.');
        } else {

            let userID = req.body.user_id;
            let param = {
                source: token.id
            };

            stripe.customers.createSource(
                userID,
                param,
                function(err, card) {
                    // asynchronously called
                    if(err) {
                        console.log(err);
                        res('REQUEST ERROR');
                    } else {
                        res.json(card);
                    }
                }
            );
        }
    });

};


exports.read_a_card = function(req, res) {
    let userID = req.params.userId;
    let cardID = req.params.cardId;

    stripe.customers.retrieveCard(
        userID,
        cardID,
        function(err, card) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(card);
            }
        }
    );
};


exports.update_a_card = function(req, res) {
    let userID = req.params.userId;
    let cardID = req.params.cardId;
    let param = {};

    stripe.customers.updateCard(
        userID,
        cardID,
        param,
        function(err, card) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(card);
            }
        }
    );
};


exports.delete_a_card = function(req, res) {
    let userID = req.params.userId;
    let cardID = req.params.cardId;

    stripe.customers.deleteCard(
        userID,
        cardID,
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
