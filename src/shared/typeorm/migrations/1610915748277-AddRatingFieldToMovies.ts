import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRatingFieldToMovies1610915748277
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('movies', [
      new TableColumn({
        name: 'rating_sum',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'rating_number',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'rating',
        type: 'decimal',
        precision: 3,
        scale: 2,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('movies', [
      new TableColumn({
        name: 'rating_sum',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'rating_number',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'rating',
        type: 'decimal',
        precision: 3,
        scale: 2,
        default: 0,
      }),
    ]);
  }
}
