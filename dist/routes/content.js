"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const express_1 = require("express");
const contentRouter = (0, express_1.Router)();
contentRouter.use(middleware_1.default);
contentRouter.get('/', (req, res) => {
    res.send("you are signed in by token ");
});
exports.default = contentRouter;
