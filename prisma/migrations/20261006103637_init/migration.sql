-- CreateTable
CREATE TABLE `tenants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` VARCHAR(191) NOT NULL,
    `nome_farmacia` VARCHAR(100) NOT NULL,
    `estado` ENUM('ATIVO', 'PENDENTE', 'SUSPENSO', 'CANCELADO') NOT NULL DEFAULT 'ATIVO',
    `data_proximo_pagamento` DATETIME(3) NOT NULL,
    `limite_dispositivos` INTEGER NOT NULL DEFAULT 5,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tenants_tenant_id_key`(`tenant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id_fk` INTEGER NOT NULL,
    `id_hardware` VARCHAR(255) NOT NULL,
    `token_jwt` VARCHAR(255) NULL,
    `data_ativacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimo_acesso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `dispositivos_id_hardware_key`(`id_hardware`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `codigos_ativacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(8) NOT NULL,
    `tenant_id_fk` INTEGER NOT NULL,
    `codigo_usado` BOOLEAN NOT NULL DEFAULT false,
    `expira_em` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `codigos_ativacao_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigos_ativacao` ADD CONSTRAINT `codigos_ativacao_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
