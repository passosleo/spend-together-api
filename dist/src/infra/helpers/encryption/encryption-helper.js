"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionHelper = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const app_config_1 = require("../../../config/app.config");
const exception_1 = require("../../exception");
class EncryptionHelper {
    secret;
    constructor(secret) {
        this.secret = secret || app_config_1.config.encryption.secret;
    }
    encrypt(value) {
        return crypto_js_1.default.AES.encrypt(JSON.stringify(value), this.secret).toString();
    }
    decrypt(value) {
        try {
            const bytes = crypto_js_1.default.AES.decrypt(value, this.secret);
            const decoded = JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
            return decoded;
        }
        catch (error) {
            throw new exception_1.Exception('BAD_REQUEST', 'Invalid token');
        }
    }
}
exports.EncryptionHelper = EncryptionHelper;
