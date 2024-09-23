// controllers/authController.js
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Login function
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res
      .status(200)
      .json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login };
