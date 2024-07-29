"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
const user_mapper_1 = require("../mappers/user-mapper");
const db_1 = require("../db");
class UserRepositoryPrisma {
    constructor() { }
    async create(data) {
        try {
            const model = await db_1.prisma.user.create({ data: user_mapper_1.UserMapper.toEntity(data) });
            return user_mapper_1.UserMapper.toDomain(model);
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
    async update(userId, data) {
        try {
            const model = await db_1.prisma.user.update({
                where: { userId },
                data: user_mapper_1.UserMapper.toPartialEntity(data),
            });
            return user_mapper_1.UserMapper.toDomain(model);
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
    async delete(userId) {
        try {
            const model = await db_1.prisma.user.delete({ where: { userId } });
            return user_mapper_1.UserMapper.toDomain(model);
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
    async findAll() {
        try {
            const models = await db_1.prisma.user.findMany();
            return models.map((model) => user_mapper_1.UserMapper.toDomain(model));
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
    async findByUniqueKey(data) {
        try {
            const model = await db_1.prisma.user.findFirst({ where: data });
            return model ? user_mapper_1.UserMapper.toDomain(model) : null;
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
    async findAllByUsername(username, excludeUsername, take = 5) {
        try {
            const models = await db_1.prisma.user.findMany({
                where: {
                    username: {
                        contains: username,
                        not: excludeUsername,
                    },
                },
                take,
            });
            return models.map((model) => user_mapper_1.UserMapper.toDomain(model));
        }
        finally {
            await db_1.prisma.$disconnect();
        }
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
