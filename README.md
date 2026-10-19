# Price Tracker

Internal app for tracking product price lists. Each product has 5 price tiers
that sales reps use as a reference when quoting clients.

## Roles
- **Admin** – manages users and all products
- **Sales Manager** – adds and edits products and prices
- **Sales Rep** – views products and prices

## Tech stack
Node.js, Express, MongoDB/Mongoose, EJS, Bootstrap, Joi

## Getting started
1. Clone the repo and run `npm install`
2. Create a `.env` file in the root:
   DB_URL=mongodb://127.0.0.1:27017/price-tracker
3. Make sure MongoDB is running locally
4. Seed sample data: `node seeds/index.js`
5. Start the app: `node app.js` and open http://localhost:3000