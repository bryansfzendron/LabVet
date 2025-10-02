/*
  Warnings:

  - You are about to drop the column `perfil` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `perfil_id` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "perfis" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "descricao" VARCHAR(200),
    "permissoes" JSONB,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfis_nome_key" ON "perfis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_codigo_key" ON "perfis"("codigo");

-- Inserir os perfis padrão
INSERT INTO "perfis" ("nome", "codigo", "descricao", "permissoes", "updated_at") VALUES
('Administrador', 'ADMIN', 'Acesso total ao sistema', '{"admin": true, "configuracoes": true, "usuarios": true, "relatorios": true, "pedidos": true, "laudos": true}'::jsonb, CURRENT_TIMESTAMP),
('Gerente', 'GERENTE', 'Gerenciamento geral do laboratório', '{"admin": false, "configuracoes": true, "usuarios": true, "relatorios": true, "pedidos": true, "laudos": true}'::jsonb, CURRENT_TIMESTAMP),
('Veterinário', 'VETERINARIO', 'Profissional veterinário', '{"admin": false, "configuracoes": false, "usuarios": false, "relatorios": true, "pedidos": true, "laudos": true}'::jsonb, CURRENT_TIMESTAMP),
('Técnico', 'TECNICO', 'Técnico de laboratório', '{"admin": false, "configuracoes": false, "usuarios": false, "relatorios": false, "pedidos": true, "laudos": false}'::jsonb, CURRENT_TIMESTAMP),
('Operador', 'OPERADOR', 'Operador básico do sistema', '{"admin": false, "configuracoes": false, "usuarios": false, "relatorios": false, "pedidos": true, "laudos": false}'::jsonb, CURRENT_TIMESTAMP);

-- Adicionar coluna perfil_id temporariamente como nullable
ALTER TABLE "usuarios" ADD COLUMN "perfil_id" INTEGER;

-- Migrar dados existentes baseado no enum atual
UPDATE "usuarios" SET "perfil_id" = (
    CASE 
        WHEN "perfil" = 'ADMIN' THEN (SELECT id FROM "perfis" WHERE "codigo" = 'ADMIN')
        WHEN "perfil" = 'GERENTE' THEN (SELECT id FROM "perfis" WHERE "codigo" = 'GERENTE')
        WHEN "perfil" = 'VETERINARIO' THEN (SELECT id FROM "perfis" WHERE "codigo" = 'VETERINARIO')
        WHEN "perfil" = 'TECNICO' THEN (SELECT id FROM "perfis" WHERE "codigo" = 'TECNICO')
        WHEN "perfil" = 'OPERADOR' THEN (SELECT id FROM "perfis" WHERE "codigo" = 'OPERADOR')
        ELSE (SELECT id FROM "perfis" WHERE "codigo" = 'OPERADOR')
    END
);

-- Tornar a coluna perfil_id obrigatória
ALTER TABLE "usuarios" ALTER COLUMN "perfil_id" SET NOT NULL;

-- Remover a coluna perfil antiga
ALTER TABLE "usuarios" DROP COLUMN "perfil";

-- DropEnum
DROP TYPE "PerfilUsuario";

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
