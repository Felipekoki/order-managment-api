import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const OrmConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'orderuser',
    password: 'v7046ea136u',
    database: 'order',
    entities: [
        __dirname + '/infrastructure/sqldb/entities/*.entity.{js,ts}',
    ],
    synchronize: true,
    logging: false
}