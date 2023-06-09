require('dotenv').config();
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret-key",
  resave: true,
  saveUninitialized: true,
}));


const eventsRouter = require("./routes/eventsRoutes");
const projectsRouter = require("./routes/projectsRoutes");
const userRouter = require("./routes/userRoutes");
const newsRouter = require("./routes/newsRoutes");

app.use("/api/events", eventsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);

app.get("/", function (req, res) {
  const username = req.session.user ? req.session.user.username : "";
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = parseInt(process.env.port || '8080');
app.listen(port, function () {
  console.log("Server running at http://localhost:" + port);
});
