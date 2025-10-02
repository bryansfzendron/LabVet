const fs = require('fs');

// Corrigir o backend - auth.controller.ts
const backendFile = '/var/www/LabVet/backend/src/controllers/auth.controller.ts';
let backendContent = fs.readFileSync(backendFile, 'utf8');

// Substituir o select do usuário
const oldSelect = `      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        perfil: true,
        ativo: true,
      },`;

const newSelect = `      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        perfil: true,
        ativo: true,
        ultimoLogin: true,
        createdAt: true,
        updatedAt: true,
      },`;

backendContent = backendContent.replace(oldSelect, newSelect);
fs.writeFileSync(backendFile, backendContent);

// Corrigir o frontend - auth.service.ts
const frontendFile = '/var/www/LabVet/frontend/src/services/auth.service.ts';
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

// Substituir o mapeamento do usuário
const oldMapping = `    // Mapear dados do usuário do backend para frontend
    const mappedUser: User = {
      ...response.user,
      role: this.mapPerfilToRole(response.user.perfil)
    };`;

const newMapping = `    // Mapear dados do usuário do backend para frontend
    const mappedUser: User = {
      id: response.user.id.toString(),
      nome: response.user.nome,
      email: response.user.email,
      role: this.mapPerfilToRole(response.user.perfil),
      ativo: response.user.ativo,
      ultimo_login: response.user.ultimoLogin ? new Date(response.user.ultimoLogin) : undefined,
      created_at: new Date(response.user.createdAt),
      updated_at: new Date(response.user.updatedAt)
    };`;

frontendContent = frontendContent.replace(oldMapping, newMapping);
fs.writeFileSync(frontendFile, frontendContent);

console.log('Correções aplicadas com sucesso!');
