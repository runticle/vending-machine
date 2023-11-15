### Welcome

Hello! This is a little project about an online vending machine.

Create an account, and decide whether to be a `buyer` or a `seller`.

As a seller, you can:

```
create products
edit your products
delete products
edit your username
delete your account (and all your products!!)
```

As a buyer, you can:

```
deposit coins into the machine
return your deposited coins
buy a product using the interface
receive change (if any)
edit your username
delete your account
```

Bare in mind the machine only accepts certain coins, and you may lose out a few pennies in your change!

The machine has an unlimited supply of change.

### Running the app

Run `npm start` in the react-app directory. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Run `npm run dev` in the node-api directory to serve data to the frontend.

You will need to configure a database and edit the .env file with the correct config. 

### Backend

The backend is written in Node using Express. I have setup some boilerplate code for the server to make it easy to develop additional routes without much pain.

I used Typeorm for the creating fully typed Models and interacting with the postgres database. I used this as I haven't used it before, and it was interesting to take a look at it. It is pretty easy to use.

I used zod to create Schemas for the route parameters. With more time I would like to imnprove the validation to throw appropriate errors.

I would also like to type the data coming into the route handlers. This can be done by inferring a type from the schema in the handler, and passing it it to as a type argument into a custom Request type.

Also, I would have liked to implement soft deletes. At the moment, deleting a user cascades the deletion and removes all access tokens and existing products.

### Frontend

The frontend is written in React. I have not spent much time on designing the interface. I have used a few external packages (again, just to get a feel for them and see how they work).

I have not done much as muh data validation on the frontend as I'd like. Ideally I would share the zod schemas across the front and backend. I am storing data simply in localstorage. With more time I would like to implement redux, but as it is such a small project I decided against doing so at the beginning.

I have mostly used styled-components to loosely style the code.

### Tests

I have not written any tests for the frontend yet. The backend project has some tests. `cd node-api` and run `npm test`. I used jest with Supertest to test api routes.

There is an insominium export with all the available routes to ping the api. You will first need to signup to get an auth token, and add it to the environment under the record `token`.

### Further work


As well as other things mentioned above, I would like to:

- implement stricter password rules
- validate data on the frontend, using react-formik
- customize alerts in the web
