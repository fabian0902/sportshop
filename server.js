require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/paymentRouter"));
app.use("/", require("./routes/upload"));

//connect to mongodb

//const uri = 'mongodb+srv://fabian0902:gato*159753FFF@sport.w15bpix.mongodb.net/?retryWrites=true&w=majority&appName=sport';
const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}?appName=${process.env.DB_CLUSTER}`;

mongoose
.connect(uri)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

//vercel config
/* app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
}); */

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
