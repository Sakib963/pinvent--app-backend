const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

const createCustomer = asyncHandler (async(req, res) => {
    const { name, description } = req.body;

    //   Validation
  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Customer
  const customer = await Customer.create({
    user: req.user.id,
    name,
    description,
  });

  res.status(201).json(customer);
});

// Get all Customer
const getCustomers = asyncHandler(async (req, res) => {
    const customer = await Customer.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(customer);
  });

// Get single customer
const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // if customer doesnt exist
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    // Match customer to its user
    if (customer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(customer);
  });


  // Delete Product
const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // if customer doesnt exist
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    // Match customer to its user
    if (customer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await customer.remove();
    res.status(200).json({ message: "Customer deleted." });
  });

  // Update Product
const updateCustomer = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
  
    const customer = await Customer.findById(id);
  
    // if customer doesnt exist
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    // Match customer to its user
    if (customer.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Update Customer
    const updatedCustomer = await Customer.findByIdAndUpdate(
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
  
    res.status(200).json(updatedCustomer);
  });

module.exports = {
    createCustomer,
    getCustomer,
    getCustomers,
    deleteCustomer,
    updateCustomer
}