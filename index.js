const { express, client } = require("./common");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(require("morgan")("dev"));

// app.get("/api/flavors", (req, res) => {
//   res.status(200).json({ message: "This works" });
// });

app.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `
    SELECT * FROM flavors;`;
    const response = await client.query(SQL);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
      SELECT * FROM flavors where id = $1;`;
    const response = await client.query(SQL, [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

app.post("/api/flavors", async (req, res, next) => {
  try {
    const { name, is_favorite } = req.body;
    const SQL = `INSERT INTO flavors(name, is_favorite) VALUES($1, $2) RETURNING *`;
    const response = await client.query(SQL, [name, is_favorite]);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `DELETE FROM flavors WHERE id =$1`;
    await client.query(SQL, [id]);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, is_favorite } = req.body;
    const SQL = `UPDATE flavors
    SET name = $1, is_favorite = $2
    WHERE id = $3
    RETURNING *`;
    const response = await client.query(SQL, [name, is_favorite, id]);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, async () => {
  await client.connect();
  console.log(`I am listening on port number ${PORT}`);
});
