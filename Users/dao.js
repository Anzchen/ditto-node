import model from "./model.js";
export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username: username, password: password });
export const updateUser = (username, user) =>
  model.updateOne({ username: username }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findFollowers = (username) =>
  model.findOne({ username: username }, { followers: 1 });
export const findFollowing = (username) =>
  model.findOne({ username: username }, { following: 1 });

export const followUser = async (currentUsername, usernameToFollow) => {
  // Add usernameToFollow to the current user's following array
  const currentUserUpdate = await model.findOneAndUpdate(
    { username: currentUsername },
    { $addToSet: { following: usernameToFollow } },
    { new: true }
  );

  // Add currentUsername to the followed user's followers array
  await model.findOneAndUpdate(
    { username: usernameToFollow },
    { $addToSet: { followers: currentUsername } }
  );

  return currentUserUpdate;
};
export const unfollowUser = async (currentUsername, usernameToUnfollow) => {
  const currentUserUpdate = await model.findOneAndUpdate(
    { username: currentUsername },
    { $pull: { following: usernameToUnfollow } },
    { new: true }
  );
  await model.findOneAndUpdate(
    { username: usernameToUnfollow },
    { $pull: { followers: currentUsername } }
  );
  return currentUserUpdate;
};

export const addFavorite = async (currentUsername, songId) => {
  const currentUserUpdate = await model.findOneAndUpdate(
    { username: currentUsername },
    { $addToSet: { songs: songId } },
    { new: true }
  );

  return currentUserUpdate;
};
