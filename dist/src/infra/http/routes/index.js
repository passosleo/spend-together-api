"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const sign_in_routes_1 = require("./sign-in/sign-in-routes");
const sign_up_routes_1 = require("./sign-up/sign-up-routes");
const user_routes_1 = require("./user/user-routes");
exports.routes = [...sign_up_routes_1.signUpRoutes, ...sign_in_routes_1.signInRoutes, ...user_routes_1.userRoutes];
