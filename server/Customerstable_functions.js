import { query } from "express";
import mysql from "mysql2/promise";
import "dotenv/config";

const conn = mysql.createPool(process.env.DATABASE_URL);
/* ====================== exported functions ============================== */

export const getCustomerinfo = async () => {
  const [rows] = await conn.execute("SELECT * FROM Customer_tb limit 20");
  return rows;
};

export const getSearchCustomerinfo = async (column, searchtxt) => {
  const txt = searchtxt + "%";
  console.log(column);
  const [rows] = await conn.execute(getquerystring(column), [txt]);
  return rows;
};

export const getrow = async (insertId) => {
  const [res] = await conn.execute("SELECT * FROM Customer_tb  WHERE id=?", [
    insertId,
  ]);
  return res;
};

export const insertdata = async (data) => {
  const { firstname, lastname, gender, address } = data;
  const res = await conn.execute(
    "INSERT INTO Customer_tb (firstname, lastname, gender, address) VALUES (?,?,?,?)",
    [firstname, lastname, gender, address]
  );
  const insertId = res[0].insertId;
  return await getrow(insertId);
};

export const DB_UpdateRow = async (id, rowdata) => {
  const { firstname, lastname, gender, address } = rowdata;
  const res = await conn.execute(
    "UPDATE Customer_tb SET firstname=?, lastname=?, gender=?, address=? WHERE id=?",
    [firstname, lastname, gender, address, id]
  );
  console.log("========================update==============================");
  console.log(res);
  return res;
};

export const DB_DeleteRow = async (id) => {
  const res = await conn.execute("DELETE FROM Customer_tb WHERE id=?", [id]);
  console.log(res);
  return res;
};

const getquerystring = (column) => {
  let querystr = "";
  if (column === "id") {
    querystr = "SELECT * FROM Customer_tb  WHERE id LIKE ?";
  } else if (column === "firstname") {
    querystr = "SELECT * FROM Customer_tb  WHERE firstname LIKE ?";
  } else if (column === "lastname") {
    querystr = "SELECT * FROM Customer_tb  WHERE lastname LIKE ?";
  } else if (column === "gender") {
    querystr = "SELECT * FROM Customer_tb  WHERE gender LIKE ?";
  } else if (column === "address") {
    querystr = "SELECT * FROM Customer_tb  WHERE address LIKE ?";
  } else if (column === "created_at") {
    querystr = "SELECT * FROM Customer_tb  WHERE created_at LIKE ?";
  }
  return querystr;
};
