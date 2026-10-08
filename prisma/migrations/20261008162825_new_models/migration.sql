-- AlterTable
ALTER TABLE `dispositivos` MODIFY `token_jwt` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `tenants` MODIFY `data_proximo_pagamento` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `planos_licenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `tipo` ENUM('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL') NOT NULL,
    `custo` DECIMAL(10, 2) NOT NULL,
    `duracao_dias` INTEGER NOT NULL,

    UNIQUE INDEX `planos_licenca_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento_licenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id_fk` INTEGER NOT NULL,
    `plano_id` INTEGER NOT NULL,
    `valor_pago` DECIMAL(10, 2) NOT NULL,
    `metodo` ENUM('DINHEIRO', 'TRANSFERENCIA') NOT NULL DEFAULT 'TRANSFERENCIA',
    `data_pagamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pagamento_licenca` ADD CONSTRAINT `pagamento_licenca_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento_licenca` ADD CONSTRAINT `pagamento_licenca_plano_id_fkey` FOREIGN KEY (`plano_id`) REFERENCES `planos_licenca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
