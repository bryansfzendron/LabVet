-- =====================================================
-- SCHEMA POSTGRESQL - SISTEMA LABVET MODERNIZADO
-- Baseado na análise do sistema Delphi legado
-- =====================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELA: usuarios (Nova - para autenticação)
-- =====================================================
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'veterinario', 'atendente', 'user')),
    ativo BOOLEAN DEFAULT true,
    ultimo_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: empresa (Configurações do laboratório)
-- =====================================================
CREATE TABLE empresa (
    id SERIAL PRIMARY KEY,
    empresa VARCHAR(50) NOT NULL,
    fantasia VARCHAR(50),
    abreviatura VARCHAR(5),
    endereco VARCHAR(50),
    numero VARCHAR(10),
    bairro VARCHAR(30),
    cidade VARCHAR(50),
    uf CHAR(2),
    cep VARCHAR(9),
    cnpj VARCHAR(18),
    telefone1 VARCHAR(15),
    telefone2 VARCHAR(15),
    email VARCHAR(200),
    site VARCHAR(100),
    logo BYTEA, -- Para armazenar imagem do logo
    versao VARCHAR(10),
    smtp_servidor VARCHAR(200),
    smtp_porta INTEGER DEFAULT 587,
    smtp_usuario VARCHAR(200),
    smtp_senha VARCHAR(200),
    pop3_servidor VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: conselhos (CRMV, etc.)
-- =====================================================
CREATE TABLE conselhos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(10) NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: profissionais_solicitantes (Veterinários)
-- =====================================================
CREATE TABLE profissionais_solicitantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    conselho_id INTEGER REFERENCES conselhos(id),
    numero_conselho VARCHAR(20),
    email VARCHAR(200),
    telefone VARCHAR(15),
    celular VARCHAR(15),
    data_nascimento DATE,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: especies (Cão, Gato, etc.)
-- =====================================================
CREATE TABLE especies (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: clientes (Tutores dos animais)
-- =====================================================
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(40),
    numero VARCHAR(50),
    complemento VARCHAR(20),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    uf CHAR(2),
    cep VARCHAR(9),
    telefone VARCHAR(13),
    fax VARCHAR(13),
    celular VARCHAR(13),
    email VARCHAR(200),
    cpf_cnpj VARCHAR(18), -- Suporta tanto CPF quanto CNPJ
    tipo_pessoa CHAR(1) DEFAULT 'F' CHECK (tipo_pessoa IN ('F', 'J')), -- F=Física, J=Jurídica
    contato VARCHAR(15), -- Pessoa de contato (para PJ)
    veterinario_responsavel_id INTEGER REFERENCES profissionais_solicitantes(id),
    restricao BOOLEAN DEFAULT false,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: animais
-- =====================================================
CREATE TABLE animais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    especie_id INTEGER NOT NULL REFERENCES especies(id),
    raca VARCHAR(30),
    cor VARCHAR(20),
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
    data_nascimento DATE,
    idade VARCHAR(10), -- Pode ser "2 anos", "6 meses", etc.
    peso DECIMAL(5,2),
    microchip VARCHAR(20),
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: tipos_exames (Hemograma, Bioquímica, etc.)
-- =====================================================
CREATE TABLE tipos_exames (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(30), -- Hematologia, Bioquímica, Microbiologia, etc.
    valor_padrao DECIMAL(10,2),
    tempo_resultado INTEGER, -- Em horas
    preparacao_necessaria TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: parametros_exames (Parâmetros específicos de cada exame)
-- =====================================================
CREATE TABLE parametros_exames (
    id SERIAL PRIMARY KEY,
    tipo_exame_id INTEGER NOT NULL REFERENCES tipos_exames(id) ON DELETE CASCADE,
    nome VARCHAR(50) NOT NULL,
    unidade VARCHAR(20),
    valor_referencia_min DECIMAL(10,4),
    valor_referencia_max DECIMAL(10,4),
    valor_referencia_texto TEXT, -- Para valores qualitativos
    ordem_exibicao INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: pedidos (Solicitações de exames)
-- =====================================================
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    codigo_pedido VARCHAR(20) UNIQUE NOT NULL, -- Código visível para o cliente
    codigo_interno VARCHAR(20), -- Código interno do laboratório
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    animal_id INTEGER REFERENCES animais(id),
    profissional_solicitante_id INTEGER REFERENCES profissionais_solicitantes(id),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_coleta TIMESTAMP,
    data_entrega_prevista TIMESTAMP,
    data_entrega_real TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'coletado', 'processando', 'pronto', 'entregue', 'cancelado')),
    prioridade VARCHAR(10) DEFAULT 'normal' CHECK (prioridade IN ('baixa', 'normal', 'alta', 'urgente')),
    valor_total DECIMAL(10,2) DEFAULT 0,
    desconto DECIMAL(10,2) DEFAULT 0,
    valor_final DECIMAL(10,2) DEFAULT 0,
    forma_pagamento VARCHAR(20),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: itens_pedido (Exames solicitados em cada pedido)
-- =====================================================
CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    tipo_exame_id INTEGER NOT NULL REFERENCES tipos_exames(id),
    quantidade INTEGER DEFAULT 1,
    valor_unitario DECIMAL(10,2),
    valor_total DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'coletado', 'processando', 'pronto', 'entregue')),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: resultados_exames (Resultados dos exames)
-- =====================================================
CREATE TABLE resultados_exames (
    id SERIAL PRIMARY KEY,
    item_pedido_id INTEGER NOT NULL REFERENCES itens_pedido(id) ON DELETE CASCADE,
    parametro_exame_id INTEGER NOT NULL REFERENCES parametros_exames(id),
    valor_numerico DECIMAL(10,4),
    valor_texto TEXT,
    valor_referencia VARCHAR(100),
    status_resultado VARCHAR(20) DEFAULT 'normal' CHECK (status_resultado IN ('normal', 'alterado', 'critico')),
    observacoes TEXT,
    data_resultado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_responsavel_id UUID REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: laudos (Laudos médicos)
-- =====================================================
CREATE TABLE laudos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
    profissional_laudo_id INTEGER REFERENCES profissionais_solicitantes(id),
    titulo VARCHAR(100),
    conteudo TEXT,
    conclusao TEXT,
    recomendacoes TEXT,
    data_laudo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'revisao', 'aprovado', 'entregue')),
    assinatura_digital TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: financeiro (Controle financeiro)
-- =====================================================
CREATE TABLE financeiro (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    categoria VARCHAR(30),
    descricao VARCHAR(100),
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'vencido', 'cancelado')),
    forma_pagamento VARCHAR(20),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: auditoria (Log de alterações)
-- =====================================================
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    tabela VARCHAR(50) NOT NULL,
    registro_id INTEGER NOT NULL,
    acao VARCHAR(10) NOT NULL CHECK (acao IN ('INSERT', 'UPDATE', 'DELETE')),
    dados_anteriores JSONB,
    dados_novos JSONB,
    usuario_id UUID REFERENCES usuarios(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para clientes
CREATE INDEX idx_clientes_nome ON clientes(nome);
CREATE INDEX idx_clientes_cpf_cnpj ON clientes(cpf_cnpj);
CREATE INDEX idx_clientes_ativo ON clientes(ativo);

-- Índices para animais
CREATE INDEX idx_animais_cliente_id ON animais(cliente_id);
CREATE INDEX idx_animais_nome ON animais(nome);
CREATE INDEX idx_animais_ativo ON animais(ativo);

-- Índices para pedidos
CREATE INDEX idx_pedidos_codigo ON pedidos(codigo_pedido);
CREATE INDEX idx_pedidos_cliente_id ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_data_pedido ON pedidos(data_pedido);
CREATE INDEX idx_pedidos_status ON pedidos(status);

-- Índices para resultados
CREATE INDEX idx_resultados_item_pedido_id ON resultados_exames(item_pedido_id);
CREATE INDEX idx_resultados_data ON resultados_exames(data_resultado);

-- Índices para auditoria
CREATE INDEX idx_auditoria_tabela_registro ON auditoria(tabela, registro_id);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_created_at ON auditoria(created_at);

-- =====================================================
-- TRIGGERS PARA UPDATED_AT AUTOMÁTICO
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger em todas as tabelas principais
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_empresa_updated_at BEFORE UPDATE ON empresa FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_animais_updated_at BEFORE UPDATE ON animais FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON pedidos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tipos_exames_updated_at BEFORE UPDATE ON tipos_exames FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parametros_exames_updated_at BEFORE UPDATE ON parametros_exames FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_itens_pedido_updated_at BEFORE UPDATE ON itens_pedido FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resultados_exames_updated_at BEFORE UPDATE ON resultados_exames FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laudos_updated_at BEFORE UPDATE ON laudos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financeiro_updated_at BEFORE UPDATE ON financeiro FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DADOS INICIAIS (SEEDS)
-- =====================================================

-- Inserir usuário administrador padrão
INSERT INTO usuarios (nome, email, senha_hash, role) VALUES 
('Administrador', 'admin@labvet.com', crypt('admin123', gen_salt('bf')), 'admin');

-- Inserir dados básicos da empresa
INSERT INTO empresa (empresa, fantasia, abreviatura) VALUES 
('Laboratório Veterinário', 'LabVet', 'LV');

-- Inserir conselhos básicos
INSERT INTO conselhos (nome, abreviatura) VALUES 
('Conselho Regional de Medicina Veterinária', 'CRMV'),
('Conselho Federal de Medicina Veterinária', 'CFMV');

-- Inserir espécies básicas
INSERT INTO especies (nome) VALUES 
('Canino'),
('Felino'),
('Equino'),
('Bovino'),
('Suíno'),
('Ovino'),
('Caprino'),
('Aves'),
('Répteis'),
('Peixes');

-- Inserir tipos de exames básicos
INSERT INTO tipos_exames (nome, categoria, valor_padrao, tempo_resultado) VALUES 
('Hemograma Completo', 'Hematologia', 45.00, 24),
('Bioquímica Básica', 'Bioquímica', 80.00, 24),
('Urinálise', 'Análises Clínicas', 35.00, 12),
('Parasitológico de Fezes', 'Parasitologia', 25.00, 12),
('Cultura Bacteriana', 'Microbiologia', 120.00, 72),
('Antibiograma', 'Microbiologia', 80.00, 48);

-- =====================================================
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE usuarios IS 'Usuários do sistema com autenticação';
COMMENT ON TABLE empresa IS 'Dados da empresa/laboratório';
COMMENT ON TABLE clientes IS 'Tutores dos animais (pessoas físicas ou jurídicas)';
COMMENT ON TABLE animais IS 'Animais cadastrados no sistema';
COMMENT ON TABLE pedidos IS 'Solicitações de exames laboratoriais';
COMMENT ON TABLE tipos_exames IS 'Tipos de exames disponíveis';
COMMENT ON TABLE resultados_exames IS 'Resultados dos exames realizados';
COMMENT ON TABLE laudos IS 'Laudos médicos veterinários';
COMMENT ON TABLE auditoria IS 'Log de todas as alterações no sistema';

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
