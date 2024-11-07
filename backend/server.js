var express = require("express");
var app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
app.use(express.urlencoded({ extended: true }));
async function connect() {
  try {
    await client.connect();
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("err occ");
    process.exit(1);
  }
}
const db = client.db("venue");
const users = db.collection("users");
const venues = db.collection("venues");
const book = db.collection("book");
/*
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/userlogin.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/pages/registeruser.html");
});

app.get("/forget", (req, res) => {
  res.sendFile(__dirname + "/pages/forget.html");
});
app.get("/delete", (req, res) => {
  res.sendFile(__dirname + "/pages/deleteuser.html");
});
*/
app.get("/insert", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      username: req.query.username,
      gender: req.query.gender,
      phone: req.query.phone,
      email: req.query.email,
      password: req.query.password,
    };
    var alreadyExist = await users.findOne({ username: req.query.username });
    if (alreadyExist) {
      data = { status: false, message: "Username already Exists" };
      console.log(data);
    } else {
      var result = await users.insertOne(doc);
      if (result != null) {
        data = { status: true, message: "Inserted Successfully" };
        res.json(data);
        console.log("Inserted Successfully");
      }
    }
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "Failed to Register" };
    res.json(data);
  }
});
app.get("/book", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      username: req.query.username,
      hallname: req.query.name,
      city: req.query.city,
      date: req.query.date,
    };
    var result = await book.insertOne(doc);
    data = { status: true, message: "Booked Successfully" };
    res.json(data);
    console.log("Booked Successfully");
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "Book Failed" };
    res.json(data);
  }
});
app.get("/addVenue", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      name: req.query.name,
      seatingcapacity: req.query.seat,
      city: req.query.city,
      ac: req.query.ac,
      parkingcapacity: req.query.park,
      roomsavailable: req.query.room,
      description: req.query.des,
    };
    var avail = await venues.findOne({
      name: req.query.name,
      city: req.query.city,
    });
    console.log(avail);
    if (avail) {
      data = { status: false, message: "Venue Name Already Available" };
    } else {
      var result = await venues.insertOne(doc);
      data = { status: true, message: "Inserted Venue Successfully" };
      res.json(data);
      console.log("Inserted Venue Successfully");
    }
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "Insert Venue Failed" };
    res.json(data);
  }
});
app.get("/check", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  var doc = {
    username: req.query.username,
    password: req.query.password,
  };
  var result = await users.findOne(doc);
  console.log(result);
  if (result != null) {
    data = { status: true, message: "Logged In Successfully", item: result };
    res.json(data);
    console.log("Logged In Successfully");
  } else {
    console.log("Log In Not Successfully");
    data = { status: false, message: "Logged In Not Successful" };
    res.json(data);
  }
});
app.get("/avail", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  var doc = {
    hallname: req.query.name,
    city: req.query.city,
    date: req.query.date,
  };
  var result = await book.findOne(doc);
  console.log(result);
  console.log(req.query.date);
  console.log(req.query.name);
  console.log(req.query.city);
  if (result != null) {
    data = {
      status: false,
      message:
        "The Selected Venue is not available for booking for the requested date",
    };
    res.json(data);
    console.log("Not Available");
  } else {
    console.log("Available");
    data = {
      status: true,
      message: "Available",
    };
    res.json(data);
  }
});
app.get("/getAllUsers", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  var result = await users.find({}).toArray();
  console.log(result);
  if (result != null) {
    data = { status: true, message: "Fetched", item: result };
    res.json(data);
    console.log("Fetched");
  } else {
    console.log("Fetch Not Successfully");
    data = { status: false, message: "Fetch Not Successful" };
    res.json(data);
  }
});
app.get("/getAllBook", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  var result = await book.find({}).toArray();
  console.log(result);
  if (result != null) {
    data = { status: true, message: "Fetched Booking", item: result };
    res.json(data);
    console.log("Fetched Booking");
  } else {
    console.log("Fetch Book Not Successfully");
    data = { status: false, message: "Fetch Book Not Successful" };
    res.json(data);
  }
});
app.get("/getAllUserBook", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  doc = {
    username: req.query.username,
  };
  var result = await book.find(doc).toArray();
  console.log(result);
  if (result != null) {
    data = { status: true, message: "Fetched User Booking", item: result };
    res.json(data);
    console.log("Fetched User Booking");
  } else {
    console.log("Fetch User Book Not Successfully");
    data = { status: false, message: "Fetch User Book Not Successful" };
    res.json(data);
  }
});
app.get("/venue", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  var result = await venues.find({}).toArray();
  console.log(result);
  if (result != null) {
    data = { status: true, message: "Retrieved Succesfully", item: result };
    res.json(data);
    console.log("Sent successfully");
  } else {
    console.log("Error in sending");
    data = { status: false, message: "Not sucessfully" };
    res.json(data);
  }
});
app.get("/update", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      username: req.query.username,
    };
    var newdoc = {
      password: req.query.password,
    };

    var result = await users.updateOne(doc, { $set: newdoc });
    if (result.modifiedCount > 0) {
      data = {
        status: true,
        message: "Updated Successfully",
        noOfDoc: result.modifiedCount,
      };
    } else {
      data = {
        status: false,
        message: "No data found",
        noOfDoc: result.modifiedCount,
      };
    }
    res.json(data);
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "Insert Failed" };
    res.json(data);
  }
});

app.get("/remove", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      username: req.query.username,
      password: req.query.password,
    };
    var result = await users.deleteOne(doc);
    if (result.deletedCount > 0) {
      data = {
        status: true,
        message: "deleted Successfully",
        noOfDoc: result.deletedCount,
      };
    } else {
      data = {
        status: false,
        message: "No data found",
        noOfDoc: result.deletedCount,
      };
    }
    res.json(data);
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "Insert Failed" };
    res.json(data);
  }
});
app.get("/remove1", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      username: req.query.username,
    };
    var result = await users.deleteOne(doc);
    var res1 = await book.deleteMany(doc);
    if (result.deletedCount > 0) {
      data = {
        status: true,
        message: "deleted Successfully",
        noOfDoc: result.deletedCount,
      };
    } else {
      data = {
        status: false,
        message: "No data found",
        noOfDoc: result.deletedCount,
      };
    }
    res.json(data);
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "delete Failed" };
    res.json(data);
  }
});
app.get("/remove2", async function (req, res) {
  try {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var doc = {
      name: req.query.name,
      city: req.query.city,
    };
    var result = await venues.deleteOne(doc);
    if (result.deletedCount > 0) {
      data = {
        status: true,
        message: "deleted venue Successfully",
        noOfDoc: result.deletedCount,
      };
    } else {
      data = {
        status: false,
        message: "No data found",
        noOfDoc: result.deletedCount,
      };
    }
    res.json(data);
  } catch (err) {
    console.error("Error ", err);
    data = { status: false, message: "delete venue Failed" };
    res.json(data);
  }
});
app.get("/removeUserBook", async function (req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  doc = {
    username: req.query.username,
    hallname: req.query.name,
    city: req.query.city,
    date: req.query.date,
  };
  console.log(req.query.username);
  console.log(req.query.name);
  console.log(req.query.city);
  console.log(req.query.date);

  var result = await book.deleteOne(doc);
  console.log(result);
  if (result.deletedCount > 0) {
    data = { status: true, message: "removed User Booking" };
    res.json(data);
    console.log("removed User Booking");
  } else {
    console.log("remove User Book Not Successfully");
    data = { status: false, message: "remove User Book Not Successful" };
    res.json(data);
  }
});
// app.get("/login", async function (req, res) {
//   var doc = {
//     username: req.query.username,
//     password: req.query.password,
//   };
//   try {
//     var result = await users.findOne(doc);
//     console.log(result);
//     if (result != null) {
//       console.log("Logged In Successfully");
//       res.sendFile(__dirname + "/homepage/home.html", function (err) {
//         if (err) {
//           console.error("Error sending home.html:", err);
//           res.status(err.status).end();
//         }
//       });
//     } else {
//       console.log("Log In Not Successfully");
//       res.sendFile(__dirname + "/login/userlogin.html", function (err) {
//         if (err) {
//           console.error("Error sending userlogin.html:", err);
//           res.status(err.status).end();
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error querying database:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
  connect(); //MongoDb comm
});
