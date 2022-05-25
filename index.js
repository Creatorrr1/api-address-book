const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const contacts = require("./data/contacts");
const meetings = require("./data/meetings");

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  console.log("got request!");
  res.json({ msg: "hello!" });
});

app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

// -----
app.get("/contacts/:id/meetings", (req, res) => {
  const eachMeetings = meetings.filter(
    (meetingItem) => meetingItem.contactId === req.params.id
  );
  res.json({ meetings: eachMeetings });
});

app.get("/contacts/:id", (req, res) => {
  // 0. extract id from the path
  console.log("params", req.params);
  console.log("id", req.params.id);
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  // 1. search the contacts array
  // 2. find the contact
  res.json({ contact: contact });
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server is active: http://localhost:${port}/`);
});
