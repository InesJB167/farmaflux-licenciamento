-- AlterTable
ALTER TABLE `pagamento_licenca`
ADD COLUMN `referencia` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pagamento_licenca_referencia_key`
ON `pagamento_licenca`(`referencia`);