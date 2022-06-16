"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

const monster = {
  name: "Monster Cookie",
  description: "cool cookie scary monster fun",
  price: 39.99,
  inventory: 364,
  imageURL:
    "https://sallysbakingaddiction.com/wp-content/uploads/2013/06/one-big-monster-cookie.jpg",
};

const sugar = {
  name: "Sugar Cookie",
  description: "very sweet cookie much delicious",
  price: 12.98,
  inventory: 2,
};

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ email: 'cody@gmail.com', username: 'cody', password: '123' }),
    User.create({ email: 'murphy@gmail.com', username: 'murphy', password: '123' }),
  ])

  const products = await Promise.all([
    Product.create(monster),
    Product.create(sugar),
  ]);

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
