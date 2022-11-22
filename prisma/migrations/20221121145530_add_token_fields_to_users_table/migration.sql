/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refresh_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `expired_date` DATETIME(3) NULL,
    ADD COLUMN `refresh_token` VARCHAR(256) NULL,
    ADD COLUMN `token` VARCHAR(256) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_token_key` ON `users`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `users_refresh_token_key` ON `users`(`refresh_token`);
