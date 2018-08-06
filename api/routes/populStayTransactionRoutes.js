'use strict';

module.exports = function(app) {
    let balanceList = require('../controllers/balanceController');
    let bankAccountList = require('../controllers/bankAccountController');
    let cardList = require('../controllers/cardController');
    let paymentList = require('../controllers/paymentController');
    let payoutList = require('../controllers/payoutController');
    let refundList = require('../controllers/refundController');
    let userList = require('../controllers/userController');

    // balanceList Routers
    app.route('/balances')
        .get(balanceList.list_all_balances);

    // bankAccountList Routers
    app.route('/bankAccounts')
        .get(bankAccountList.list_all_bankAccounts)
        .post(bankAccountList.create_a_bankAccount);
    app.route('/bankAccounts/:userId/:bankAccountId')
        .get(bankAccountList.read_a_bankAccount)
        .put(bankAccountList.update_a_bankAccount)
        .delete(bankAccountList.delete_a_bankAccount);

    // cardList Routers
    app.route('/cards')
        .get(cardList.list_all_cards)
        .post(cardList.create_a_card);
    app.route('/cards/:userId/:cardId')
        .get(cardList.read_a_card)
        .put(cardList.update_a_card)
        .delete(cardList.delete_a_card);

    // paymentList Routes
    app.route('/payments')
        .get(paymentList.list_all_payments)
        .post(paymentList.create_a_payment);
    app.route('/payments/:paymentId')
        .get(paymentList.read_a_payment)
        .put(paymentList.update_a_payment);

    // payoutList Routes
    app.route('/payouts')
        .get(payoutList.list_all_payouts)
        .post(payoutList.create_a_payout);
    app.route('/payouts/:payoutId')
        .get(payoutList.read_a_payout)
        .delete(payoutList.cancel_a_payout);

    // refundList Routers
    app.route('/refunds')
        .get(refundList.list_all_refunds)
        .post(refundList.create_a_refund);
    app.route('/refunds/:refundId')
        .get(refundList.read_a_refund);

    // userList Routers
    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_a_user);
    app.route('/users/:userId')
        .get(userList.read_a_user)
        .put(userList.update_a_user)
        .delete(userList.delete_a_user);
};