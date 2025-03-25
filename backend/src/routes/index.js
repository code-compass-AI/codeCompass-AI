const express = require("express");
const authRouter = require("./authRoutes");
const docsRouter = require("./getDocs");
const router = express.Router();

router.use('/auth',authRouter);
router.use('/docs',docsRouter);

module.exports = router;