"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserSchema = void 0;
const zod_1 = require("zod");
exports.SearchUserSchema = {
    query: {
        username: zod_1.z.string().min(3).max(255),
    },
};
