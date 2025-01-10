const { client } = require("./common");

const seed = async () => {
  try {
    await client.connect();
    const SQL = `DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
    );
    INSERT INTO flavors(name) VALUES ('Chocolate');
    INSERT INTO flavors(name) VALUES ('Vanilla');
    INSERT INTO flavors(name) VALUES ('Strawberry');
    INSERT INTO flavors(name, is_favorite) VALUES ('Chocolate Chip Cookie Dough', true);
    `;
    await client.query(SQL);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

seed();
