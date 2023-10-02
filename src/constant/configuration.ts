export default () => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  database: {
    type: 'mongo',
    host: process.env.MYSQL_HOST || 'localhost',
    port: (process.env.MYSQL_PORT as unknown as number) || 3306,
    database: process.env.MYSQL_DB || 'vitamin_store',
    username: process.env.MYSQL_ROOT_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    entities: ['dist/module/**/entities/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    migrationsRun: false,
  },
});
