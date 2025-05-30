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
const middleware_1 = __importDefault(require("../middleware"));
const db_1 = require("../db");
const express_1 = require("express");
const contentRouter = (0, express_1.Router)();
// Wrap async middleware to handle errors , copilot helped here
contentRouter.use((req, res, next) => {
    Promise.resolve((0, middleware_1.default)(req, res, next)).catch(next);
});
//user sending data to the database 
contentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.ContentModel.create({
        link, type, title, userId: req.userId
    });
    res.send("content created");
}));
// user seeing its data 
contentRouter.get('/view_me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const result = yield db_1.ContentModel.find({ userId: id });
    res.json({ result });
}));
contentRouter.put('/update_content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    const result = yield db_1.ContentModel.updateMany({ userId: req.userId }, { link, type, title });
    res.json({
        message: 'All user content updated successfully'
    });
}));
exports.default = contentRouter;
