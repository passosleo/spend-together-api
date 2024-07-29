"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordSchema = void 0;
const zod_1 = require("zod");
exports.RecoverPasswordSchema = {
    body: { newPassword: zod_1.z.string().min(8).optional() },
    query: { token: zod_1.z.string() },
};
