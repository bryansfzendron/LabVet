"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseHealth = exports.disconnectDatabase = exports.connectDatabase = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
    errorFormat: 'pretty',
});
if (process.env.NODE_ENV === 'development') {
    prisma.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        console.log(`🔍 Query ${params.model}.${params.action} executada em ${after - before}ms`);
        return result;
    });
}
const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Conectado ao PostgreSQL com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log('✅ Desconectado do PostgreSQL com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao desconectar do banco de dados:', error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
const checkDatabaseHealth = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch (error) {
        console.error('❌ Banco de dados não está respondendo:', error);
        return false;
    }
};
exports.checkDatabaseHealth = checkDatabaseHealth;
exports.default = prisma;
//# sourceMappingURL=database.js.map