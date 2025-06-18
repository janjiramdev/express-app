export const users = [];

export const findUsers = async () => {
  // Mockup process time
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};

export const findUserById = async (id) => {
  // Mockup process time
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users.find((user) => user.id === id);
};

export const findUserByUsername = async (username) => {
  // Mockup process time
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users.find((u) => u.username === username);
};

export const findUserByIdAndUpdate = async (id, { password, refreshToken }) => {
  // Mockup process time
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userIndex = users.findIndex((u) => u.id === id);
  if (password) users[userIndex].password = password;
  if (refreshToken) users[userIndex].refreshToken = refreshToken;

  return users[userIndex];
};

export const createUser = async (username, password) => {
  // Mockup process time
  await new Promise((resolve) => setTimeout(resolve, 250));

  const createdUser = {
    id: String(users.length + 1),
    username,
    password
  };
  users.push(createdUser);

  return createdUser;
};
