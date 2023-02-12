const express = require("express");

const noticesControllers = require("../controllers/notices-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/", noticesControllers.getNotices);

router.post("/create", noticesControllers.createNotice);

router.delete("/:nid", noticesControllers.deleteNotice);

module.exports = router;
