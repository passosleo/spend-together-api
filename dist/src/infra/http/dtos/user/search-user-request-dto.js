"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     SearchUserRequestDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 */
class SearchUserRequestDTO {
    username;
    constructor(data) {
        this.username = data.username;
    }
    static create(data) {
        return new SearchUserRequestDTO(data);
    }
}
exports.SearchUserRequestDTO = SearchUserRequestDTO;
