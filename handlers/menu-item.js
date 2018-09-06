const db = require("../models");

exports.createMenuItem = async function(req, res, next) {
  try {
    let menuItem = await db.Menu.create({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      beer: req.body.beer,
      hotDrinks: req.body.hotDrinks,
      coldDrinks: req.body.coldDrinks,
      juicesAndSmoothies: req.body.juicesAndSmoothies,
      ingredients: req.body.ingredients,
      event: req.body.event,
      order: req.body.order,
      time: req.body.time,
      date: req.body.date,
      facebook: req.body.facebook,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.menuItems.push(menuItem.id);
    await foundUser.save();
    let foundItem = await db.Menu.findById(menuItem._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundItem);
  } catch (err) {
    return next(err);
  }
};

exports.getMenuItem = async function(req, res, next) {
  try {
    let menuItem = await db.Menu.find(req.params.menuItem_id);
    return res.status(200).json(menuItem);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMenuItem = async function(req, res, next) {
  try {
    // let foundItem = await db.Menu.findById(req.params.menuItem_id);
    // await foundItem.remove();
    // await foundItem.deleteOne();
    let foundItem = await db.Menu.findByIdAndDelete(req.params.menuItem_id);

    return res.status(200).json(foundItem);
  } catch (err) {
    return next(err);
  }
};

exports.updateMenuItem = async function(req, res, next) {
  try {
    console.log(req.body);
    let foundItem = await db.Menu.findByIdAndUpdate(req.params.menuItem_id, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        beer: req.body.beer,
        hotDrinks: req.body.hotDrinks,
        coldDrinks: req.body.coldDrinks,
        juicesAndSmoothies: req.body.juicesAndSmoothies,
        ingredients: req.body.ingredients,
        event: req.body.event,
        order: req.body.order,
        time: req.body.time,
        date: req.body.date,
        facebook: req.body.facebook,
        user: req.params.id
      }
    });

    return res.status(200).json(foundItem);
  } catch (err) {
    return next(err);
  }
};
