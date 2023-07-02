import mysql from "mysql2/promise";

const conn = mysql.createPool(
  'mysql://tq7a0za6phrrft2a0pv2:pscale_pw_lUq6YfB9yHpN0Ik4GkbvNEPk78Qn7WOAvfimIaD54f5@aws.connect.psdb.cloud/main-db?ssl={"rejectUnauthorized":true}'
);

const getdata = async (data) => {
  try {
    const [rows, fields] = await conn.execute(
      "SELECT * FROM Usertable WHERE uuid =?",
      [data.uuid]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

const addnewuser = async (data) => {
  try {
    const res = await conn.execute(
      "INSERT INTO Usertable (username , colour , online , socketid , uuid)" +
        "VALUES (?,?,?,?,?)",
      [data.username, data.usercolor, "true", data.socketid, data.uuid]
    );
    console.log(res);
  } catch (error) {
    throw error;
  }
};

const updateuser = async (data) => {
  try {
    const res = await conn.execute(
      "UPDATE Usertable SET  username = ?, colour =?, online=? ,socketid=? WHERE uuid =?",
      [data.username, data.usercolor, "true", data.socketid, data.uuid]
    );
    console.log(res);
  } catch (error) {
    throw error;
  }
};

const getallonlineusers = async (data) => {
  try {
    const [rows, fields] = await conn.execute(
      "SELECT * FROM Usertable  WHERE online =?",
      ["true"]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const userdisconnected = async (socketid) => {
  try {
    const res = await conn.execute(
      "UPDATE Usertable SET  username = ?, colour =?, online=? ,socketid=? WHERE socketid =?",
      ["", "", "false", "", socketid]
    );
    console.log(res);
  } catch (error) {
    throw error;
  }
};

//getallonlineusersforall
//============================== exported functions===========================================

export const userjoined = async (data) => {
  try {
    const userdata = await getdata(data);
    userdata.length > 0 ? await updateuser(data) : await addnewuser(data);
    const onlinearr = await getallonlineusers(data);
    return onlinearr;
  } catch (error) {
    throw error;
  }
};

export const disconnectuser = async (socketid) => {
  try {
    await userdisconnected(socketid);
    const onlinearr = await getallonlineusers();
    return onlinearr;
  } catch (error) {
    throw error;
  }
};

export const userconnected = async () => {
  try {
    const onlinearr = await getallonlineusers();
    return onlinearr;
  } catch (error) {
    throw error;
  }
};
