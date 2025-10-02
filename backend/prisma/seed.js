"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');
    const existingAdmin = await prisma.usuario.findFirst({
        where: {
            email: 'admin@labvet.com'
        }
    });
    if (existingAdmin) {
        console.log('✅ Usuário admin já existe');
        return;
    }
    const perfilAdmin = await prisma.perfil.findUnique({
        where: { codigo: 'ADMIN' }
    });
    if (!perfilAdmin) {
        throw new Error('Perfil ADMIN não encontrado. Execute as migrações primeiro.');
    }
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.usuario.create({
        data: {
            nome: 'Administrador',
            email: 'admin@labvet.com',
            senha: hashedPassword,
            perfilId: perfilAdmin.id,
            ativo: true,
        },
        include: {
            perfil: true
        }
    });
    console.log('✅ Usuário admin criado com sucesso:', {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
        perfil: admin.perfil.codigo
    });
    const users = [
        {
            nome: 'Gerente Teste',
            email: 'gerente@labvet.com',
            senha: 'gerente123',
            perfil: 'GERENTE'
        },
        {
            nome: 'Dr. Veterinário',
            email: 'vet@labvet.com',
            senha: 'vet123',
            perfil: 'VETERINARIO'
        },
        {
            nome: 'Atendente Teste',
            email: 'atendente@labvet.com',
            senha: 'atendente123',
            perfil: 'OPERADOR'
        }
    ];
    for (const userData of users) {
        const existingUser = await prisma.usuario.findFirst({
            where: { email: userData.email }
        });
        if (!existingUser) {
            const perfil = await prisma.perfil.findUnique({
                where: { codigo: userData.perfil }
            });
            if (!perfil) {
                console.error(`❌ Perfil ${userData.perfil} não encontrado`);
                continue;
            }
            const hashedUserPassword = await bcrypt.hash(userData.senha, 10);
            const user = await prisma.usuario.create({
                data: {
                    nome: userData.nome,
                    email: userData.email,
                    senha: hashedUserPassword,
                    perfilId: perfil.id,
                    ativo: true,
                },
                include: {
                    perfil: true
                }
            });
            console.log(`✅ Usuário ${userData.perfil} criado:`, {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil.codigo
            });
        }
    }
    console.log('🎉 Seed concluído com sucesso!');
}
main()
    .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map