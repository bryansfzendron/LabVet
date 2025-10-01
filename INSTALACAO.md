# 🚀 Guia de Instalação - LabVet

## ⚠️ Problema Identificado: Caminhos Longos no Windows

Durante a instalação, identificamos um problema comum no Windows relacionado a **caminhos de arquivo muito longos**. O npm falha ao criar diretórios com caminhos que excedem o limite do Windows.

### 🔍 Diagnóstico Atual
- ✅ **Node.js**: v20.17.0 encontrado em `C:\Users\38337\AppData\Local\nodejs\`
- ✅ **npm**: Disponível mas com problemas de PATH
- ❌ **Instalação**: Falha por caminhos longos (`ENOTDIR: not a directory`)

## 🛠️ Soluções Recomendadas

### Solução 1: Mover Projeto para Caminho Mais Curto
```bash
# Mover o projeto para um caminho mais curto
# De: E:\Outros computadores\notebook ryzen7\sistemas\Delphi\MSSQL\LabVet-Refatorado
# Para: C:\LabVet

# 1. Criar diretório no C:
mkdir C:\LabVet

# 2. Copiar arquivos
xcopy "E:\Outros computadores\notebook ryzen7\sistemas\Delphi\MSSQL\LabVet-Refatorado" "C:\LabVet" /E /I

# 3. Navegar para o novo local
cd C:\LabVet
```

### Solução 2: Habilitar Caminhos Longos no Windows
```powershell
# Executar como Administrador
# Habilitar suporte a caminhos longos
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# Reiniciar o computador após esta alteração
```

### Solução 3: Usar WSL (Windows Subsystem for Linux)
```bash
# Instalar WSL2 e Ubuntu
wsl --install

# Dentro do WSL, navegar para o projeto
cd /mnt/e/Outros\ computadores/notebook\ ryzen7/sistemas/Delphi/MSSQL/LabVet-Refatorado

# Instalar Node.js no WSL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar dependências
cd backend && npm install
cd ../frontend && npm install
```

## 🏃‍♂️ Instalação Após Resolver Caminhos

### 1. Configurar PATH do Node.js
```powershell
# Adicionar ao PATH permanentemente
$env:PATH += ";C:\Users\38337\AppData\Local\nodejs"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH, [EnvironmentVariableTarget]::User)
```

### 2. Instalar Backend
```bash
cd backend

# Instalar dependências
npm install

# Configurar banco de dados
cp .env.example .env
# Editar .env com suas configurações

# Executar migrações
npx prisma migrate dev
npx prisma generate
npx prisma db seed

# Iniciar servidor
npm run dev
```

### 3. Instalar Frontend
```bash
cd frontend

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Iniciar desenvolvimento
npm run dev
```

## 🎯 Teste Rápido

Após resolver o problema de caminhos, você pode testar:

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Deve iniciar em http://localhost:3001

# Terminal 2 - Frontend  
cd frontend
npm run dev
# Deve iniciar em http://localhost:3000
```

## 📋 Checklist de Verificação

- [ ] Node.js v18+ instalado e no PATH
- [ ] Caminho do projeto < 260 caracteres
- [ ] npm install funciona sem erros
- [ ] Backend inicia em localhost:3001
- [ ] Frontend inicia em localhost:3000
- [ ] Login funciona com credenciais de teste

## 🆘 Problemas Comuns

### Erro: "node is not recognized"
```bash
# Verificar instalação
where node
node --version

# Se não encontrar, adicionar ao PATH
$env:PATH += ";C:\Users\38337\AppData\Local\nodejs"
```

### Erro: "ENOTDIR: not a directory"
- **Causa**: Caminho muito longo
- **Solução**: Mover projeto para C:\LabVet ou habilitar caminhos longos

### Erro: "Cannot connect to database"
- **Causa**: SQL Server não configurado
- **Solução**: Verificar string de conexão no .env

## 📞 Suporte

Se os problemas persistirem:
1. Verificar logs detalhados em `npm-debug.log`
2. Tentar instalação em modo verbose: `npm install --verbose`
3. Considerar usar Yarn: `yarn install`

## 🎉 Próximos Passos

Após instalação bem-sucedida:
1. Explorar o dashboard em http://localhost:3000
2. Testar login com usuários padrão
3. Navegar pelos módulos implementados
4. Começar desenvolvimento das funcionalidades específicas