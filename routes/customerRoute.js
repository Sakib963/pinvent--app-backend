const express = require("express");
const { createCustomer, getCustomer, getCustomers, deleteCustomer, updateCustomer } = require("../controllers/customerController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();

router.post("/", protect, createCustomer);
router.get("/", protect, getCustomers);
router.get("/:id", protect, getCustomer);
router.delete("/:id", protect, deleteCustomer);
router.patch("/:id", protect, updateCustomer);

module.exports = router;