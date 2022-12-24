const express = require('express')
const router = express.Router()


router.get("/wx_openid", async (req, res) => {
    if (req.headers["x-wx-source"]) {
      res.send(req.headers["x-wx-openid"]);
    }
});

module.exports = router