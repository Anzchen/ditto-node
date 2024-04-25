import * as dao from "./dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.username);
    res.json(user);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { username } = req.params;
    console.log("userId: " + username);
    console.log("request body: " + JSON.stringify(req.body));
    const status = await dao.updateUser(username, req.body);
    const currentUser = await dao.findUserByUsername(username);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const getSongs = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user.songs);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;

    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const findFollowers = async (req, res) => {
    const users = await dao.findFollowers(req.body.username);
    res.json(users);
  };

  const findFollowing = async (req, res) => {
    const users = await dao.findFollowing(req.body.username);
    res.json(users);
  };

  const followUser = async (req, res) => {
    const toFollow = req.body.username;
    const user = req.session["currentUser"];
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const updatedUser = await dao.followUser(user.username, toFollow);
    res.json(updatedUser.following);
  };

  const unfollowUser = async (req, res) => {
    const toUnfollow = req.body.username;
    const user = req.session["currentUser"];
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const updatedUser = await dao.unfollowUser(user.username, toUnfollow);
    res.json(updatedUser.following);
  };

  const addFavorite = async (req, res) => {
    const song = req.body.songId;
    const user = req.session["currentUser"];
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const updatedUser = await dao.addFavorite(user.username, song);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser.songs);
  };

  app.get("/api/users/following", findFollowing);
  app.get("/api/users/followers", findFollowers);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/songs/:userId", getSongs);
  app.post("/api/users", createUser);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/getuser/:username", findUserByUsername);
  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/followuser", followUser);
  app.post("/api/users/unfollowuser", unfollowUser);
  app.post("/api/users/addfav", addFavorite);
}
