"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupRouter = (0, express_1.Router)();
signupRouter.get('/', (req, res) => {
    res.send("you are signup again ");
});
exports.default = signupRouter;
