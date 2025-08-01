import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754033421423 implements MigrationInterface {
    name = 'Init1754033421423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."post_type_enum" AS ENUM('text', 'quote')`);
        await queryRunner.query(`CREATE TABLE "post" ("postId" SERIAL NOT NULL, "type" "public"."post_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_9b3ab408235ba7d60345a84f994" PRIMARY KEY ("postId"))`);
        await queryRunner.query(`CREATE TABLE "like" ("likedId" SERIAL NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_35d058f2a1d3208ee34a6cb07a8" PRIMARY KEY ("likedId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "quote_post" ("quotePostId" SERIAL NOT NULL, "quote" text NOT NULL, "author" character varying NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_66e5a59491563fc521494db0b8b" PRIMARY KEY ("quotePostId"))`);
        await queryRunner.query(`CREATE TABLE "text_post" ("textPostId" SERIAL NOT NULL, "content" character varying NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_1ad57339651312b009acbda1c43" PRIMARY KEY ("textPostId"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`DROP TABLE "text_post"`);
        await queryRunner.query(`DROP TABLE "quote_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TYPE "public"."post_type_enum"`);
    }

}
