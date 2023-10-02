import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST || 'localhost',
    port: (process.env.MYSQL_PORT as unknown as number) || 3306,
    database: process.env.MYSQL_DB || 'vitamin_store',
    username: process.env.MYSQL_ROOT_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
})


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })