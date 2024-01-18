const express = require("express");
const session = require("express-session");
const passport = require("passport");
const auth = require("./auth");
const app = express();

app.use(session({ secret: "dogs" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.get("/", (req, res) => {
  res.send("<a href='auth/google'>Click to authenticate with google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/return",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong..");
});
app.get("/return", isLoggedIn, (req, res) => {
  res.send("Hello Welcome to  Google OAuth2 Authentication ");
});

app.listen(5000, () => console.log("listening on: 5000"));
