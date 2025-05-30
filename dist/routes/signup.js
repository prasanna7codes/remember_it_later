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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupRouter = (0, express_1.Router)();
signupRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    //checking the username and password criteria are met 
    if (!/^[a-zA-Z]{3,10}$/.test(username)) {
        res.status(411).json({ message: 'Username must be 3–10 letters only' });
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
        res.status(411).json({
            message: 'Password must be 8–20 characters, include one uppercase, one lowercase, one number, and one special character',
        });
    }
    //checking if the user exists 
    const user = yield db_1.UserModel.findOne({ username });
    if (user) {
        res.status(403).json({
            message: "This email is alredy existing in our database"
        });
        return;
    }
    else {
        // hashing the password and then storing in the database 
        const hash = bcrypt_1.default.hashSync(password, 5);
        yield db_1.UserModel.create({
            username, password: hash
        });
        res.send("you are signed up ");
    }
}));
exports.default = signupRouter;
