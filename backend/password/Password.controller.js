const Password = require("./Password.model");

// creating a new password

async function createPassword(req, res) {
  try {
    const password = req.body.password;
    const result = await Password.create({ value: password });
    res.status(200).json(result);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Failed to create password" });
  }
}
async function getPasswords(req, res) {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve passwords" });
  }
}

module.exports = {
  createPassword,
  getPasswords,
};
