import express from "express";
import http from "http";
import { Server } from "socket.io";
import { randomUUID } from "crypto";
import cors from "cors";
import {
  userjoined,
  disconnectuser,
  userconnected,
} from "./Userdatabase_functions.js";
import {
  getCustomerinfo,
  getSearchCustomerinfo,
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

  //socket.on("customerinfo-res", ()=>{

  //})

  // user disconnected form server
  socket.on("disconnect", async () => {
    try {
      const res = await disconnectuser(socket.id);
      socket.broadcast.emit("userdisconnected", { res: res, status: "ok" });
      console.log(socket.id);
    } catch (error) {
      socket.emit("userdisconnected", { res: error, status: "nok" });
    }
  });
});

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

app.get("/customerdatasearch/:column/:searchtxt", async (req, res) => {
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

app.get("/", (req, res) => {
  res.send("server is up and running");
});

httpserver.listen(3000, () => {
  console.log("server started on port 3000");
});
