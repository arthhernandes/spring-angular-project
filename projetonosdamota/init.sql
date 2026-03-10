-- 1. Tabela de Clientes
CREATE TABLE IF NOT EXISTS tb_customer (
    id BIGSERIAL PRIMARY KEY, -- BIGSERIAL garante o BIGINT auto-incremento
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

-- 2. Tabela de Produtos
CREATE TABLE IF NOT EXISTS tb_product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    production_time INTEGER -- Tempo em minutos ou horas
);

-- 3. Tabela de Pedidos
CREATE TABLE IF NOT EXISTS tb_order (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    description TEXT,
    price DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDENTE',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES tb_customer(id)
);

-- 4. Tabela Associativa ManyToMany (Aqui estava o erro!)
CREATE TABLE IF NOT EXISTS order_products (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES tb_order(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES tb_product(id) ON DELETE CASCADE
);

-- 5. Tabela de Usuários (Login)
CREATE TABLE IF NOT EXISTS tb_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50)
);

INSERT INTO tb_user (username, password, role) 
VALUES ('arthurito', 'motinha', 'ADMIN')
ON CONFLICT (username) DO NOTHING;

-- Garante que o UPDATE também use texto puro
UPDATE tb_user SET password = 'motinha' WHERE username = 'arthurito';
