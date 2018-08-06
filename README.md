# node-stripe-payment-api

Access to the [Stripe](https://stripe.com/) [API](https://stripe.com/docs/api).

node-stripe-payment-api is a RESTful API built with Node.js to perform transaction with [Stripe](https://stripe.com/) integration


## Installation

node-stripe-payment-api requires [Node.js](https://nodejs.org/) v6+ and [npm](https://www.npmjs.com/) installed to run.

First, you need to create a .env file in the root directory. The file contain the public and private keys of your Stripe API:

```sh
    PUBLISHABLE_KEY=YOUR_PUBLIC_KEY_HERE
    SECRET_KEY=YOUR_PRIVATE_KEY_HERE
```

Run the following command to download all the node dependencies:

```sh
    npm install
```

To start the server:

```sh
    npm start
```

The payment application will be running on port 3000


## API calls documentation

Admin required for all routes!

### Balance
- GET `/balances` - List all balances

### Bank Account
- GET `/bankAccounts?userID=USER_ID&limit=INTEGER` - List all bank accounts

		USER_ID (REQUIRE): The id of the user

		limit (optional): Number of bank_account objects from user to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/bankAccounts/` - Create a bank account

		request_body = {
			user_id (REQUIRED): The id of the user for this card
			account_number (REQUIRED): The account number for the bank account, in string form. Must be a checking account,
			country (REQUIRED): The country in which the bank account is located (Ex: US/JP),
			currency (REQUIRED): The currency the bank account is in. This must be a country/currency pairing that Stripe supports.,
			account_holder_name (REQUIRED): The name of the person or business that owns the bank account,
			account_holder_type (REQUIRED): The type of entity that holds the account. This can be either ‘individual’ or ‘company’,
			routing_number (REQUIRED for US bank accounts, optional otherwise): The routing number, sort code, or other country-appropriate institution number for the bank account
		}

- GET `/bankAoounts/:USER_ID/:BANK_ACCOUNT_ID` - Read a bank account

		USER_ID (REQUIRED): The ID of the user

		BANK_ACCOUNT_ID (REQUIRED): The id of the bank account

- PUT `/bankAoounts/:USER_ID/:BANK_ACCOUNT_ID` - Update a bank account

		USER_ID (REQUIRED): The ID of the user

		BANK_ACCOUNT_ID (REQUIRED): The id of the card

		request_body = {
			account_holder_name (REQUIRED): The name of the person or business that owns the bank account,
			account_holder_type (REQUIRED): The type of entity that holds the account. This can be either ‘individual’ or ‘company’
		}

- DELETE `/bankAoounts/:USER_ID/:BANK_ACCOUNT_ID` - Delete a bank account

		USER_ID (REQUIRED): The ID of the user

		CARD_ID (REQUIRED): The id of the bank account

### Card

- GET `/cards?userID=USER_ID&limit=INTEGER` - List all cards

		USER_ID (REQUIRE): The id of the user

		limit (optional): Number of card objects from user to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/cards` - Create a card

		request_body = {
			user_id (REQUIRED): The id of the user for this card
			card_number (REQUIRED): The number of the credit card,
			exp_month (REQUIRED): The card's expiration month in two-digit number,
			exp_year (REQUIRED): The card's expiration year in two- or four-digit number,
			cvc (REQUIRED): Card security code,
			name (optional): Cardholder's full name,
			address_line1 (optional): User’s address line 1,
			address_line2 (optional): User’s address line 2,
			address_city (optional): User’s city,
			address_state (optional): User’s state,
			address_zip (optional): User’s zip code,
			address_country (optional) User’s country
		}

- GET `/cards/:USER_ID/:CARD_ID` - Read a card

		USER_ID (REQUIRED): The ID of the user

		CARD_ID (REQUIRED): The id of the card

- PUT `/cards/:USER_ID/:CARD_ID` - Update a card

		USER_ID (REQUIRED): The ID of the user

		CARD_ID (REQUIRED): The id of the card

		request_body = {
			name (optional): Cardholder name,
			address_line1 (optional): User’s Address line 1,
			address_line2 (optional): User’s Address line 2,
            address_city (optional): City/District/Suburb/Town/Village,
			address_state (optional): State/County/Province/Region,
			address_zip (optional): User’s ZIP or postal code,
			address_country (optional): User’s billing address country,
			exp_month (optional): The card’s expiration month in two-digit number,
			exp_year (optional): The card’s expiration year in four-digit number
		}

- DELETE `/cards/:USER_ID/:CARD_ID` - Delete a card

		USER_ID (REQUIRED): The ID of the user

		CARD_ID (REQUIRED): The id of the card

### Payment

- GET `/payments?limit=INTEGER` - List all payments

		limit (optional): Number of payment objects to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/payments` - Create a payment

		request_body = {
			amount (REQUIRED): A positive integer representing how much to charge, in the smallest currency unit (e.g., 100 cents to charge $1.00, or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 USD or equivalent in charge currency,
			currency (REQUIRED): Three-letter ISO currency code, in lowercase. Must be a supported currency,
			customer (REQUIRED): The user_id that will be charged in this request,
			source (REQUIRED): The card_id or the bank_account_id to be charged,
			description (optional): An arbitrary string which you can attach to this payment object,
			receipt_email (optional): The email address to which this charge’s receipt will be sent
		}

- GET `/payments/:PAYMENT_ID` - Read a payment

		PAYMENT_ID (REQUIRED): The id of the payment

- PUT `/payments/:PAYMENT_ID` - Update a payment

		request_body = {
			description (optional): An arbitrary string which you can attach to this payment object
		}

### Payout

- GET `/payouts?limit=INTEGER` - List all payouts

		limit (optional): Number of payout objects to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/payouts` - Create a payout

		request_body = {
			amount (REQUIRED): A positive integer in cents representing how much to payout,
			currency (REQUIRED): Three-letter ISO currency code, in lowercase. Must be a supported currency,
			destination_id (optional): The bank_account_id or card_id to send the payout to. If no destination is supplied, the default external account for the specified currency will be used,
			description (optional): An arbitrary string attached to the object. Often useful for displaying to users
		}

- GET `/payouts/:PAYOUT_ID` - Read a payout

		PAYOUT_ID (REQUIRED)

- DELETE `/payouts/:PAYOUT_ID` - Cancel a payout

		PAYOUT_ID (REQUIRED)

### Refund

- GET `/refunds?limit=INTEGER` - List all refunds

		limit (optional): Number of refund objects to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/refunds` - Create a refund

		request_body = {
			charge_id (REQUIRED): The id of the payment to refund
		}

- GET `/refunds/:REFUND_ID` - Read a refund

		REFUND_ID (REQUIRED): The id of the refund

### User

- GET `/users?limit=INTEGER` - List all users

		limit (optional): Number of user objects to be returned. Limit can range between 1 and 100, and the default is 10.

- POST `/users` - Create a user

		request_body = {
			email (REQUIRED): ‘email@domain.com’,
			first_name (REQUIRED): ‘FIRST_NAME’,
			last_name (REQUIRED): ‘LAST_NAME’
		}

- GET `/users/:USER_ID` - Read a user

		USER_ID (REQUIRED): The id of the user

- PUT `/users/:USER_ID` - Update a user

		USER_ID (REQUIRED): The id of the user

		request_body = {
			account_balance (optional): INTEGER,
			description (optional): ‘DESCRIPTION’
			email (optional): ‘email@domain.com’,
			first_name (optional): ‘FIRST_NAME’,
			last_name (optional): ‘LAST_NAME’
		}

- DELETE `/users/:USER_ID` - Delete a user

		USER_ID (REQUIRED): The id of the user


## TODO
 - Add authentication
 - For more, see the [issue tracker](http://github.com/Wrinth/node-stripe-payment-api).


## Author

Hoyeung Lai (johnl4112@gmail.com).


License
----

MIT