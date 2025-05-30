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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const jwt_secret = "hello";
function middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
            if (decoded) {
                const user = yield db_1.UserModel.findById(decoded._id);
                if (!user) {
                    return res.status(401).send("User not found");
                }
                req.userId = user._id.toString();
                return next();
            }
            else {
                return res.status(401).send("Invalid token");
            }
        }
        catch (err) {
            return res.status(401).send("Invalid token");
        }
    });
}
exports.default = middleware;
