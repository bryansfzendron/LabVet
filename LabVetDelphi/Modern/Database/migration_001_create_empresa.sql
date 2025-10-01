-- Migration 001: Criar tabela empresa
-- Data: 2024-01-XX
-- Descrição: Migração da tabela Empresa do SQL Server/BDE para PostgreSQL

-- Criar extensão para UUID se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela empresa
CREATE TABLE IF NOT EXISTS empresa (
    cod_empresa SERIAL PRIMARY KEY,
    empresa VARCHAR(50) NOT NULL,
    fantasia VARCHAR(50),
    abreviatura VARCHAR(5),
    endereco VARCHAR(50),
    bairro VARCHAR(30),
    cidade VARCHAR(50),
    uf CHAR(2),
    cep VARCHAR(9),
    cnpj VARCHAR(15),
    fone1 VARCHAR(15),
    fone2 VARCHAR(15),
    imagem BYTEA,
    data_cadastro TIMESTAMP,
    versao VARCHAR(10),
    pop3 VARCHAR(200),
    smtp VARCHAR(200),
    email VARCHAR(200),
    senha VARCHAR(40),
    site VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_empresa_nome CHECK (LENGTH(TRIM(empresa)) > 0),
    CONSTRAINT chk_empresa_uf CHECK (uf IS NULL OR LENGTH(uf) = 2),
    CONSTRAINT chk_empresa_email CHECK (
        email IS NULL OR 
        email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    )
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_empresa_fantasia ON empresa(fantasia);
CREATE INDEX IF NOT EXISTS idx_empresa_cnpj ON empresa(cnpj);
CREATE INDEX IF NOT EXISTS idx_empresa_cidade ON empresa(cidade);
CREATE INDEX IF NOT EXISTS idx_empresa_email ON empresa(email);

-- Criar índice único para CNPJ (removendo caracteres especiais)
CREATE UNIQUE INDEX IF NOT EXISTS idx_empresa_cnpj_unique 
ON empresa(REGEXP_REPLACE(cnpj, '[^0-9]', '', 'g')) 
WHERE cnpj IS NOT NULL AND LENGTH(TRIM(cnpj)) > 0;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_empresa_updated_at ON empresa;
CREATE TRIGGER update_empresa_updated_at
    BEFORE UPDATE ON empresa
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentários na tabela e colunas
COMMENT ON TABLE empresa IS 'Tabela de empresas/clínicas do sistema LabVet';
COMMENT ON COLUMN empresa.cod_empresa IS 'Código único da empresa (chave primária)';
COMMENT ON COLUMN empresa.empresa IS 'Razão social da empresa';
COMMENT ON COLUMN empresa.fantasia IS 'Nome fantasia da empresa';
COMMENT ON COLUMN empresa.abreviatura IS 'Abreviatura da empresa (máx 5 caracteres)';
COMMENT ON COLUMN empresa.cnpj IS 'CNPJ da empresa (com formatação)';
COMMENT ON COLUMN empresa.imagem IS 'Logo da empresa em formato binário';
COMMENT ON COLUMN empresa.data_cadastro IS 'Data de cadastro original (migração)';
COMMENT ON COLUMN empresa.pop3 IS 'Servidor POP3 para recebimento de emails';
COMMENT ON COLUMN empresa.smtp IS 'Servidor SMTP para envio de emails';
COMMENT ON COLUMN empresa.email IS 'Email principal da empresa';
COMMENT ON COLUMN empresa.senha IS 'Senha do email (criptografada)';
COMMENT ON COLUMN empresa.created_at IS 'Data/hora de criação do registro';
COMMENT ON COLUMN empresa.updated_at IS 'Data/hora da última atualização';

-- Inserir dados de exemplo (opcional - remover em produção)
INSERT INTO empresa (
    empresa, fantasia, abreviatura, endereco, bairro, cidade, uf, cep,
    cnpj, fone1, email, versao, data_cadastro
) VALUES (
    'Clínica Veterinária Exemplo Ltda',
    'Vet Exemplo',
    'VETEX',
    'Rua das Flores, 123',
    'Centro',
    'São Paulo',
    'SP',
    '01234-567',
    '12.345.678/0001-90',
    '(11)1234-5678',
    'contato@vetexemplo.com.br',
    '2.0.0',
    CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- Verificar se a migração foi executada com sucesso
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'empresa') THEN
        RAISE NOTICE 'Migration 001: Tabela empresa criada com sucesso!';
    ELSE
        RAISE EXCEPTION 'Migration 001: Falha ao criar tabela empresa!';
    END IF;
END $$;