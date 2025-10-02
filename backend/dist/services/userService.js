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
exports.userService = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const mockUsers = [
    {
        id: '1',
        nome: 'Administrador',
        email: 'admin@labvet.com',
        senha_hash: '',
        role: 'admin',
        ativo: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01')
    },
    {
        id: '2',
        nome: 'Dr. João Silva',
        email: 'joao@labvet.com',
        senha_hash: '',
        role: 'veterinario',
        ativo: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01')
    },
    {
        id: '3',
        nome: 'Maria Santos',
        email: 'maria@labvet.com',
        senha_hash: '',
        role: 'atendente',
        ativo: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01')
    }
];
const initializeUsers = async () => {
    const defaultPassword = 'labvet123';
    const saltRounds = 10;
    for (const user of mockUsers) {
        if (!user.senha_hash) {
            user.senha_hash = await bcrypt.hash(defaultPassword, saltRounds);
        }
    }
};
initializeUsers();
class UserService {
    async login(loginData) {
        const { email, senha } = loginData;
        const user = mockUsers.find(u => u.email === email && u.ativo);
        if (!user) {
            return null;
        }
        const senhaValida = await bcrypt.compare(senha, user.senha_hash);
        if (!senhaValida) {
            return null;
        }
        user.ultimo_login = new Date();
        user.updated_at = new Date();
        const token = (0, auth_1.generateToken)(parseInt(user.id), user.email, user.role);
        const { senha_hash, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    }
    async createUser(userData) {
        const { nome, email, senha, role = 'user' } = userData;
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return null;
        }
        const saltRounds = 10;
        const senha_hash = await bcrypt.hash(senha, saltRounds);
        const newUser = {
            id: (mockUsers.length + 1).toString(),
            nome,
            email,
            senha_hash,
            role,
            ativo: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        mockUsers.push(newUser);
        const { senha_hash: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }
    async getUserById(id) {
        const user = mockUsers.find(u => u.id === id && u.ativo);
        if (!user) {
            return null;
        }
        const { senha_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getAllUsers() {
        return mockUsers
            .map(({ senha_hash, ...user }) => user);
    }
    async updateUser(id, updateData) {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return null;
        }
        const user = mockUsers[userIndex];
        if (!user) {
            return null;
        }
        if (updateData.nome)
            user.nome = updateData.nome;
        if (updateData.email)
            user.email = updateData.email;
        if (updateData.role)
            user.role = updateData.role;
        if (typeof updateData.ativo === 'boolean')
            user.ativo = updateData.ativo;
        if (updateData.senha) {
            const saltRounds = 10;
            user.senha_hash = await bcrypt.hash(updateData.senha, saltRounds);
        }
        user.updated_at = new Date();
        const { senha_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async deleteUser(id) {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return false;
        }
        const user = mockUsers[userIndex];
        if (!user) {
            return false;
        }
        user.ativo = false;
        user.updated_at = new Date();
        return true;
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map