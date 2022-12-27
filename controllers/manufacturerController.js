const asyncHandler = require("express-async-handler");
const Manufacturer = require("../models/manufacturerModel");

const createManufacturer = asyncHandler (async(req, res) => {
    const { name, description } = req.body;

    //   Validation
  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Manufacturer
  const manufacturer = await Manufacturer.create({
    user: req.user.id,
    name,
    description,
  });

  res.status(201).json(manufacturer);
});

// Get all Manufacturer
const getManufacturers = asyncHandler(async (req, res) => {
    const manufacturer = await Manufacturer.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(manufacturer);
  });

  // Get single manufacturer
const getManufacturer = asyncHandler(async (req, res) => {
    const manufacturer = await Manufacturer.findById(req.params.id);
    // if manufacturer doesnt exist
    if (!manufacturer) {
      res.status(404);
      throw new Error("Manufacturer not found");
    }
    // Match manufacturer to its user
    if (manufacturer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(manufacturer);
  });

  // Delete Manufacturer
const deleteManufacturer = asyncHandler(async (req, res) => {
    const manufacturer = await Manufacturer.findById(req.params.id);
    // if manufacturer doesnt exist
    if (!manufacturer) {
      res.status(404);
      throw new Error("Manufacturer not found");
    }
    // Match manufacturer to its user
    if (manufacturer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await manufacturer.remove();
    res.status(200).json({ message: "Manufacturer deleted." });
  });

  // Update Manufacturer
const updateManufacturer = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
  
    const manufacturer = await Manufacturer.findById(id);
  
    // if manufacturer doesnt exist
    if (!manufacturer) {
      res.status(404);
      throw new Error("Manufacturer not found");
    }
    // Match manufacturer to its user
    if (manufacturer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Update manufacturer
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  
    res.status(200).json(updatedManufacturer);
  });


module.exports = {
    createManufacturer,
    getManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer
}