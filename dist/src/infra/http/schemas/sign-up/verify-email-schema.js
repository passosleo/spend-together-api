"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailSchema = void 0;
const zod_1 = require("zod");
exports.VerifyEmailSchema = {
    query: {
        token: zod_1.z.string(),
    },
};
