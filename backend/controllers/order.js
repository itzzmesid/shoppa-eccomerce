const { Order } = require("../db/models/order");

// currently inactive controller.

exports.addOrder = (req, res) => {
  const order = new Order(req.body);
  order.user = req.user.id;
  order.save((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      res.status(201).json({ data });
    }
  });
};

