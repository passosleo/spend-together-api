"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRecoverPasswordSchema = void 0;
const zod_1 = require("zod");
exports.SendRecoverPasswordSchema = {
    body: {
        email: zod_1.z.string().email().max(255).trim().toLowerCase(),
    },
};
