const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createMenuItem,
  getMenuItem,
  deleteMenuItem,
  updateMenuItem
} = require("../handlers/menu-item");

router.route("/").post(createMenuItem);
router
  .route("/:menuItem_id")
  .get(getMenuItem)
  .delete(deleteMenuItem)
  .put(updateMenuItem);
module.exports = router;
