import { query } from "express";
import mysql from "mysql2/promise";

const conn = mysql.createPool(
  'mysql://tq7a0za6phrrft2a0pv2:pscale_pw_lUq6YfB9yHpN0Ik4GkbvNEPk78Qn7WOAvfimIaD54f5@aws.connect.psdb.cloud/main-db?ssl={"rejectUnauthorized":true}'
);

/* ====================== exported functions ============================== */

export const getCustomerinfo = async () => {
  try {
    const [rows] = await conn.execute("SELECT * FROM Customer_tb limit 4");
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getSearchCustomerinfo = async (column, searchtxt) => {
  try {
    const txt = searchtxt + "%";

    console.log(column);
    const [rows] = await conn.execute(getquerystring(column), [txt]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
