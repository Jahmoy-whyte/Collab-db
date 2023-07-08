import mysql from "mysql2/promise";
import "dotenv/config";

const conn = mysql.createPool(process.env.DATABASE_URL);

const getdata = async (data) => {
  const [rows, fields] = await conn.execute(
    "SELECT * FROM Usertable WHERE uuid =?",
    [data.uuid]
  );

  return rows;
};

const addnewuser = async (data) => {
  const res = await conn.execute(
    "INSERT INTO Usertable (username , colour , online , socketid , uuid , selectedrowid)" +
      "VALUES (?,?,?,?,?,?)",
    [data.username, data.usercolor, "true", data.socketid, data.uuid, ""]
  );
  console.log(res);
};

const updateuser = async (data) => {
  const res = await conn.execute(
    "UPDATE Usertable SET  username = ?, colour =?, online=? ,socketid=?, selectedrowid =? WHERE uuid =?",
    [data.username, data.usercolor, "true", data.socketid, "", data.uuid]
  );
  console.log(res);
};

const getallonlineusers = async (data) => {
  const [rows, fields] = await conn.execute(
    "SELECT * FROM Usertable  WHERE online =?",
    ["true"]
  );
  return rows;
};

const userdisconnected = async (socketid) => {
  const res = await conn.execute(
    "UPDATE Usertable SET  username = ?, colour =?, online=? ,socketid=?, selectedrowid =? WHERE socketid =?",
    ["", "", "false", "", "", socketid]
  );
  console.log(res);
};

const update_user_selectedrowid = async (uuid, selectedrowid) => {
  const res = await conn.execute(
    "UPDATE Usertable SET selectedrowid=? WHERE uuid=?",
    [selectedrowid, uuid]
  );
  return res;
};

//============================== exported functions===========================================

export const userjoined = async (data) => {
  const userdata = await getdata(data);
  userdata.length > 0 ? await updateuser(data) : await addnewuser(data);
  const onlinearr = await getallonlineusers(data);
  return onlinearr;
};

export const disconnectuser = async (socketid) => {
  await userdisconnected(socketid);
  const onlinearr = await getallonlineusers();
  return onlinearr;
};

export const userconnected = async () => {
  const onlinearr = await getallonlineusers();
  return onlinearr;
};

export const rowclick = async (uuid, selectedrowid) => {
  await update_user_selectedrowid(uuid, selectedrowid);
  const onlinearr = await getallonlineusers();
  return onlinearr;
};
