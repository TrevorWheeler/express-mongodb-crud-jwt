const mongoose = require("mongoose");
const User = require("./user");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: String
    },
    breakfast: {
      type: Boolean,
      default: false
    },
    lunch: {
      type: Boolean,
      default: false
    },
    beer: {
      type: Boolean,
      default: false
    },
    wine: {
      type: Boolean,
      default: false
    },
    hotDrinks: {
      type: Boolean,
      default: false
    },
    coldDrinks: {
      type: Boolean,
      default: false
    },
    juicesAndSmoothies: {
      type: Boolean,
      default: false
    },
    recipe: {
      type: Boolean,
      default: false
    },
    event: {
      type: Boolean,
      default: false
    },
    time: {
      type: String
    },
    order: {
      type: Number
    },
    facebook: {
      type: String
    },
    date: {
      type: String
    },

    ingredients: [
      {
        type: Number
      }
      // http POST localhost:8081/api/users/5b721c0d58f4340277603f43/menuItem "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzIxYzBkNThmNDM0MDI3NzYwM2Y0MyIsInVzZXJuYW1lIjoidGhlY2FmIiwiaWF0IjoxNTM0MjA1MTI5fQ.P6XEFNR5u2CfX6-ttwhwVE2hsvUKo0I-g2ZzY96EYSg"  name="apple" description="granny smith" price="22" lunch="true" ingredients:='["core", "stem", "yeah"]'
    ],
    image: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

menuSchema.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.menu.remove(this.id);
    await user.save();
  } catch (err) {
    return next(err);
  }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
