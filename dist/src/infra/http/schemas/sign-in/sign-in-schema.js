"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInSchema = void 0;
const zod_1 = require("zod");
exports.SignInSchema = {
    body: {
        email: zod_1.z.string().email().max(255).trim().toLowerCase(),
        password: zod_1.z.string().min(8),
    },
};
