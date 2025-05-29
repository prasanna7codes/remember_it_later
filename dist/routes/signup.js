"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const signupRouter = (0, express_1.Router)();
signupRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.name;
    const password = req.body.password;
    if (!/^[a-zA-Z]{3,10}$/.test(username)) {
        return res.status(400).json({ message: 'Username must be 3–10 letters only' });
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
        return res.status(400).json({
            message: 'Password must be 8–20 characters, include one uppercase, one lowercase, one number, and one special character',
        });
    }
    else {
        yield db_1.UserModel.create({ username, password });
        res.send("you are sign up by me ");
    }
}));
exports.default = signupRouter;
