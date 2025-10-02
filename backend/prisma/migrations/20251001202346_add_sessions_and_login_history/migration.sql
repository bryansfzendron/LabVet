-- CreateTable
CREATE TABLE "sessoes_ativas" (
    "id" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "ip" VARCHAR(45),
    "user_agent" TEXT,
    "dispositivo" VARCHAR(100),
    "localizacao" VARCHAR(100),
    "inicio_sessao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_atividade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessoes_ativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_login" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "ip" VARCHAR(45),
    "user_agent" TEXT,
    "dispositivo" VARCHAR(100),
    "localizacao" VARCHAR(100),
    "sucesso" BOOLEAN NOT NULL DEFAULT true,
    "motivo" VARCHAR(200),
    "data_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_logout" TIMESTAMP(3),
    "duracao_sessao" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessoes_ativas_token_key" ON "sessoes_ativas"("token");

-- AddForeignKey
ALTER TABLE "sessoes_ativas" ADD CONSTRAINT "sessoes_ativas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_login" ADD CONSTRAINT "historico_login_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
