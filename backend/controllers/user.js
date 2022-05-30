/******* Modules nécessaires */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("../db.config");
const user = require("../models/user");

// Créate
exports.signup = async (req, res) => {
  const { nom, pseudo, email, password } = req.body;

  // Validation des données reçues
  if (!nom || !pseudo || !email || !password) {
    return res.status(400).json({ message: "Missing data !" });
  }

  try {
    // Vérification si User n'existe pas
    const user = await DB.User.findOne({ where: { email: email } });

    if (user != null) {
      return res
        .status(409)
        .json({ message: `This email '${req.body.email}' is already used !` });
    }
    // Hashage du mot de passe
    let hash = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    req.body.password = hash;

    // Création du nouvel User
    let newUser = await DB.User.create({
      nom: req.body.nom,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    });
    return res.json({ message: "User created", data: newUser });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};

// Read One
exports.getUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Verification champs id complété et cohérents
  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Récupération du user
  DB.User.findOne({ where: { id: userId } })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "This user does not exist" });
      }
      // Utilisateur trouvé
      return res.json({ data: user });
    })
    .catch((err) => res.status(500).json({ message: "Database error", err }));
};

// Read All
exports.getAll = (req, res) => {
  DB.User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => res.status(500).json(err));
};

exports.loggin = async (req, res) => {
  try {
    let user = await DB.User.findOne({ where: { email: req.body.email } });
    // Vérification si user exist
    if (!user) {
      return res.status(401).json({ message: "User not found !" });
    }
    // Vérification du mot de passe
    let valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    // Génération du token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_DURATION,
    });
    return res.json({ userId: user.id, token: token });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
// Update One
exports.updateUser = async (req, res) => {
  // Vérification si id cohérent
  let userId = parseInt(req.params.id);

  // Verification champs id complété et cohérents
  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Recherche de l'utilisateur
  let user = await DB.User.findOne({ where: { id: userId } });
  if (user === null) {
    return res.status(404).json({ message: "This user does not exists" });
  }
// Vérification de l'identité de l'utilisateur
  if (user.id !== req.user.id) {
    return res.json({ message: "You can not update this profile !" });
  }
  // Mise à jour du User
  await User.update(req.body, { where: { id: userId } });
  return res.json({ message: "User Updated" });
};

// Delete One
exports.deleteUser = async (req, res) => {
  // Vérification si id est cohérent
  let userId = req.params.id;
  if (userId === null) {
    return res.status(400).json({ message: "Missing parameter" });
  }
  // Recherche de l'utilisateur
  let user = await DB.User.findOne({ where: { id: userId } });
  // Vérification de l'identité de l'utilisateur
  if (user.id !== req.user.id) {
    return res.json({ message: "You can not delete this profile !" });
  }
  // Suppression de l'utilisateur
  await DB.User.destroy({ where: { id: userId } })
    .then(() => res.status(200).json({ message: "User deleted" }))
    .catch((err) => res.status(500).json({ message: "Error delete", err }));
};