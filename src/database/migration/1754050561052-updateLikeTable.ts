import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikeTable1754050561052 implements MigrationInterface {
    name = 'UpdateLikeTable1754050561052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "deletedAt"`);
    }

}
