// Update with your config settings.
const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "mssql",
    connection: {
      host: "localhost\\SQLEXPRESS",
      user: "sa",
      password: "admin",
      database: "diydb",
      options: {
        port: 1433,
        encrypt: true
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
      tableName: "migrations"
    },
    seeds: { directory: "./seeds" }
  },

  production: {
    client: "mssql",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations"
    },
    seeds: { directory: "./seeds" }
  },

  heroku: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./sqlite/db.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./sqlite/migrations"
    },
    seeds: {
      directory: "./sqlite/seeds"
    }
  },

  devazure: {
    client: "mssql",
    connection: {
      host: "ratemydiy.database.windows.net",
      user: "diyadmin",
      password: "Lambda13",
      database: "diydb",
      options: {
        port: 1433,
        encrypt: true
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
      tableName: "migrations"
    },
    seeds: { directory: "./seeds" }
  }
};
