"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../../config/app.config");
class JWTService {
    secret;
    expiresIn;
    constructor(secret, expiresIn) {
        this.secret = secret || app_config_1.config.jwt.secret;
        this.expiresIn = expiresIn || app_config_1.config.jwt.expiresIn;
    }
    createToken(payload) {
        return jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(payload)), this.secret, { expiresIn: this.expiresIn });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.JWTService = JWTService;
