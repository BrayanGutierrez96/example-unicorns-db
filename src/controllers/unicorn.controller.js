import { conection } from "../db.js";

const messagge = { messagge: "Unicorn not found" };

export const getUnicorns = async (req, res) => {
  try {
    const result = await conection.query(
      "SELECT * FROM unicorns ORDER BY unicornid"
    );

    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

export const createUnicorn = async (req, res) => {
  try {
    const { name, power, img, age } = req.body;
    const result = await conection.query(
      "INSERT INTO unicorns(name, power, img, age) VALUES ($1,$2,$3,$4)",
      [name, power, img, age]
    );
    res.status(200).json({ messagge: "unicorn created" });
  } catch (err) {
    res.json(err);
  }
};

export const updateUnicorn = async (req, res) => {
  try {
    const { name, power, age, img } = req.body;
    const { unicornid } = req.params;
    console.log(unicornid);
    const result = await conection.query(
      "UPDATE unicorns SET name = COALESCE($1, name), power = COALESCE($2, power), img=COALESCE($3,img), age= COALESCE($4, age) WHERE unicornid = $5 RETURNING *",
      [name, power, img, age, unicornid]
    );

    if (result.rowCount != 0) {
      res.status(200).json({ messagge: "unicorn update" });
    } else {
      res.status(404).json(messagge);
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const getUnicorn = async (req, res) => {
  try {
    const { unicornid } = req.params;
    const result = await conection.query(
      `SELECT * FROM unicorns WHERE unicornid = ${unicornid}`
    );
    if (result.rowCount != 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json(messagge);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnicorn = async (req, res) => {
  try {
    const { unicornid } = req.params;

    const result = await conection.query(
      "DELETE FROM unicorns WHERE unicornid= $1",
      [unicornid]
    );
    if (result.rowCount != 0) {
      res.status(200).json({ messagge: "unicorn deleted" });
    } else {
      res.status(404).json(messagge);
    }
  } catch (error) {
    console.log(error);
  }
};
