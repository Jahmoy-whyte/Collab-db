import express from "express";
import http from "http";
import { Server } from "socket.io";
import { randomUUID } from "crypto";
import cors from "cors";
import {
  userjoined,
  disconnectuser,
  rowclick,
} from "./Userdatabase_functions.js";
import {
  getCustomerinfo,
  getSearchCustomerinfo,
  insertdata,
  DB_UpdateRow,
  DB_DeleteRow,
  DB_pagination,
} from "./Customerstable_functions.js";

const app = express();
app.use(express.json());
app.use(cors());
const httpserver = http.createServer(app);

const io = new Server(httpserver, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("they joined " + socket.id);

  socket.on("userjoined", async (arg) => {
    try {
      const data = { ...arg, socketid: socket.id };
      const res = await userjoined(data);
      socket.emit("userjoined-res", { res: res, status: "ok" });
      socket.broadcast.emit("userjoined-res", { res: res, status: "ok" });
      console.log(data);
    } catch (error) {
      console.log("============================= error");
      socket.emit("userjoined-res", { res: error, status: "nok" });
    }
  });

  socket.on("disconnect", async () => {
    try {
      const res = await disconnectuser(socket.id);
      socket.broadcast.emit("userdisconnected", { res: res, status: "ok" });
      console.log(socket.id);
    } catch (error) {
      socket.emit("userdisconnected", { res: error, status: "nok" });
    }
  });

  socket.on("rowclick", async (data) => {
    console.log(data);
    try {
      const res = await rowclick(data.uuid, data.selectedrowid);
      // socket.broadcast.emit("rowclick-res", { res: res, status: "ok" });
      socket.broadcast.emit("userjoined-res", { res: res, status: "ok" });
    } catch (error) {
      socket.broadcast.emit("userjoined-res", { res: error, status: "nok" });
    }
  });

  socket.on("tablemodified", (data) => {
    socket.emit("tablemodified-res", data);
    socket.broadcast.emit("tablemodified-res", data);
  });
});
//  =====================  User table data ==================================
app.get("/getid", (req, res) => {
  let uuid = randomUUID();
  res.json({ uuid: uuid });
});

//  =====================  customer table data ==================================

app.get("/customerdata", async (req, res) => {
  try {
    const data = await getCustomerinfo();
    res.json({ res: data, status: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ res: error, status: "nok" });
  }
});

app.get("/customerdata/:column/:searchtxt", async (req, res) => {
  try {
    const column = req.params.column;
    const searchtxt = req.params.searchtxt;
    const data = await getSearchCustomerinfo(column, searchtxt);
    res.json({ res: data, status: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ res: error, status: "nok" });
  }
});

app.post("/customerdata", async (req, res) => {
  try {
    const rowdata = req.body;
    const responce = await insertdata(rowdata);
    res.json({ res: responce, status: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ res: error, status: "nok" });
  }
});

app.put("/customerdata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rowdata = req.body;
    const responce = await DB_UpdateRow(id, rowdata);
    res.json({ res: responce, status: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ res: error, status: "nok" });
  }
});

app.delete("/customerdata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const responce = await DB_DeleteRow(id);
    res.json({ res: responce, status: "ok" });
  } catch (error) {
    res.status(400);
    res.json({ res: error, status: "nok" });
  }
});

app.get("/customerdata/:start", async (req, res) => {
  try {
    const start = req.params.start;
    const responce = await DB_pagination(start);
    res.json({ res: responce, status: "ok" });
  } catch (error) {
    // res.status(400);
    console.log(error);
    res.json({ res: error, status: "nok" });
  }
});

app.get("/", (req, res) => {
  res.send("server is up and running");
});

httpserver.listen(process.env.PORT || 3000, () => {
  console.log("server started on port " + process.env.PORT);
});

//collabdb-server.onrender.com
