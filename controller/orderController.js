const orderModel = require("../model/orderModel");

// place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      res.status(404).send({
        success: false,
        message: "Cart is empty"
      });
    }
    let total = 0;
    // cal
    cart.map((item) => {
      total += item.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error
    });
  }
};
// change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      res.status(404).send({
        success: false,
        message: "No Order Found"
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated Successfully",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Change Order Status API",
      error
    });
  }
};

module.exports = {
  placeOrderController,
  orderStatusController
};
