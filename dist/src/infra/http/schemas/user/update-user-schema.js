"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserSchema = {
    body: {
        name: zod_1.z.string().min(3).max(255).toUpperCase().optional(),
        isPublic: zod_1.z.boolean().optional(),
        receiveEmails: zod_1.z.boolean().optional(),
    },
};
