const express = require("express");
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", createUser);
router.get("/", verifyToken ,getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
