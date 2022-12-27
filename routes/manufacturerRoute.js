const express = require("express");
const { createManufacturer, getManufacturers, getManufacturer, deleteManufacturer, updateManufacturer } = require("../controllers/manufacturerController");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();

router.post("/", protect, createManufacturer);
router.get("/", protect, getManufacturers);
router.get("/:id", protect, getManufacturer);
router.delete("/:id", protect, deleteManufacturer);
router.patch("/:id", protect, updateManufacturer);

module.exports = router;