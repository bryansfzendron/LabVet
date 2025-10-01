-- CreateEnum
CREATE TYPE "PerfilUsuario" AS ENUM ('ADMIN', 'GERENTE', 'VETERINARIO', 'TECNICO', 'OPERADOR');

-- CreateEnum
CREATE TYPE "TipoProfissional" AS ENUM ('SOLICITANTE', 'INTERNO', 'AMBOS');

-- CreateEnum
CREATE TYPE "SexoAnimal" AS ENUM ('MACHO', 'FEMEA', 'INDEFINIDO');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('PENDENTE', 'COLETADO', 'EM_ANALISE', 'LIBERADO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusExame" AS ENUM ('PENDENTE', 'EM_ANALISE', 'LIBERADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('RECEBER', 'PAGAR');

-- CreateEnum
CREATE TYPE "StatusConta" AS ENUM ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoConfiguracao" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON');

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "razao_social" VARCHAR(100) NOT NULL,
    "nome_fantasia" VARCHAR(100),
    "cnpj" VARCHAR(18),
    "inscricao_estadual" VARCHAR(20),
    "endereco" VARCHAR(200),
    "cidade" VARCHAR(50),
    "uf" VARCHAR(2),
    "cep" VARCHAR(10),
    "telefone" VARCHAR(20),
    "email" VARCHAR(100),
    "logo" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "perfil" "PerfilUsuario" NOT NULL DEFAULT 'OPERADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conselhos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(10) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conselhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissionais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "documento" VARCHAR(20),
    "registro" VARCHAR(20),
    "conselho_id" INTEGER,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100),
    "endereco" VARCHAR(200),
    "cidade" VARCHAR(50),
    "uf" VARCHAR(2),
    "cep" VARCHAR(10),
    "tipo" "TipoProfissional" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "cod_cliente" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "endereco" VARCHAR(40),
    "numero" VARCHAR(50),
    "compl" VARCHAR(50),
    "bairro" VARCHAR(30),
    "cep" VARCHAR(9),
    "cidade" VARCHAR(30),
    "uf" VARCHAR(2),
    "telefone" VARCHAR(13),
    "fax" VARCHAR(13),
    "celular" VARCHAR(13),
    "email" VARCHAR(200),
    "cpf_cgc" VARCHAR(18),
    "contato" VARCHAR(15),
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restricao" VARCHAR(1) DEFAULT 'N',
    "data_atualizacao" TIMESTAMP(3),
    "ativo" VARCHAR(1) NOT NULL DEFAULT 'S',
    "cod_vet_resp" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("cod_cliente")
);

-- CreateTable
CREATE TABLE "especies" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "especie_id" INTEGER NOT NULL,
    "raca" VARCHAR(50),
    "sexo" "SexoAnimal" NOT NULL,
    "idade" VARCHAR(20),
    "peso" DECIMAL(5,2),
    "cor" VARCHAR(30),
    "cliente_id" INTEGER NOT NULL,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exames" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "metodologia" TEXT,
    "material" VARCHAR(100),
    "valor" DECIMAL(10,2),
    "tempo_resultado" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametros_exames" (
    "id" SERIAL NOT NULL,
    "exame_id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "unidade" VARCHAR(20),
    "valor_referencia" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parametros_exames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "profissional_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "data_coleta" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "status" "StatusPedido" NOT NULL DEFAULT 'PENDENTE',
    "valor_total" DECIMAL(10,2),
    "desconto" DECIMAL(5,2) DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_exames" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "exame_id" INTEGER NOT NULL,
    "valor" DECIMAL(10,2),
    "status" "StatusExame" NOT NULL DEFAULT 'PENDENTE',
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_exames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultados_exames" (
    "id" SERIAL NOT NULL,
    "pedido_exame_id" INTEGER NOT NULL,
    "parametro_id" INTEGER NOT NULL,
    "valor" TEXT,
    "observacao" TEXT,
    "alterado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resultados_exames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laudos" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "profissional_id" INTEGER,
    "usuario_id" INTEGER,
    "conteudo" TEXT NOT NULL,
    "observacoes" TEXT,
    "data_liberacao" TIMESTAMP(3),
    "assinado" BOOLEAN NOT NULL DEFAULT false,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "data_envio" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laudos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bancos" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10),
    "nome" VARCHAR(100) NOT NULL,
    "agencia" VARCHAR(20),
    "nome_agencia" VARCHAR(100),
    "conta" VARCHAR(20),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bancos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER,
    "banco_id" INTEGER,
    "tipo" "TipoConta" NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "data_pagamento" TIMESTAMP(3),
    "status" "StatusConta" NOT NULL DEFAULT 'PENDENTE',
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_sistema" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "acao" VARCHAR(100) NOT NULL,
    "tabela" VARCHAR(50),
    "registro_id" INTEGER,
    "dados_antigos" JSONB,
    "dados_novos" JSONB,
    "ip" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracoes_sistema" (
    "id" SERIAL NOT NULL,
    "chave" VARCHAR(100) NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" "TipoConfiguracao" NOT NULL DEFAULT 'STRING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracoes_sistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "empresas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "conselhos_sigla_key" ON "conselhos"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "especies_nome_key" ON "especies"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "exames_codigo_key" ON "exames"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_numero_key" ON "pedidos"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_exames_pedido_id_exame_id_key" ON "pedidos_exames"("pedido_id", "exame_id");

-- CreateIndex
CREATE UNIQUE INDEX "resultados_exames_pedido_exame_id_parametro_id_key" ON "resultados_exames"("pedido_exame_id", "parametro_id");

-- CreateIndex
CREATE UNIQUE INDEX "configuracoes_sistema_chave_key" ON "configuracoes_sistema"("chave");

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_conselho_id_fkey" FOREIGN KEY ("conselho_id") REFERENCES "conselhos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_cod_vet_resp_fkey" FOREIGN KEY ("cod_vet_resp") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animais" ADD CONSTRAINT "animais_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animais" ADD CONSTRAINT "animais_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cod_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parametros_exames" ADD CONSTRAINT "parametros_exames_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "exames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("cod_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos_exames" ADD CONSTRAINT "pedidos_exames_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos_exames" ADD CONSTRAINT "pedidos_exames_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "exames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados_exames" ADD CONSTRAINT "resultados_exames_pedido_exame_id_fkey" FOREIGN KEY ("pedido_exame_id") REFERENCES "pedidos_exames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados_exames" ADD CONSTRAINT "resultados_exames_parametro_id_fkey" FOREIGN KEY ("parametro_id") REFERENCES "parametros_exames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laudos" ADD CONSTRAINT "laudos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laudos" ADD CONSTRAINT "laudos_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laudos" ADD CONSTRAINT "laudos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_banco_id_fkey" FOREIGN KEY ("banco_id") REFERENCES "bancos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
