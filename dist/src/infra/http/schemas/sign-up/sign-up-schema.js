"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = {
    body: {
        email: zod_1.z.string().email().max(255).trim().toLowerCase(),
        password: zod_1.z.string().min(8),
        username: zod_1.z.string().min(3).max(50).trim().toLowerCase(),
        name: zod_1.z.string().min(3).max(50).trim().toUpperCase().optional(),
        avatar: zod_1.z.string().optional(),
    },
};
