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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signinRouter = (0, express_1.Router)();
const jwt_secret = "hello";
signinRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({ username });
    if (user) {
        const present = bcrypt_1.default.compareSync(password, user.password);
        if (present) {
            const token = jsonwebtoken_1.default.sign(username, jwt_secret);
            res.json({
                "token": token
            });
        }
        else {
            res.json({
                "message": "invalid password"
            });
        }
    }
    else {
        res.json({
            "message": "user does not exist "
        });
    }
}));
exports.default = signinRouter;
