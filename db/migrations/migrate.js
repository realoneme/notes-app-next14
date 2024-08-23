const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
require("dotenv").config({ path: ".env.local" });

const pushMigration = async () => {
  // we will push the migration to the database
  const migrationClient = postgres(process.env.DB_CONNECTION_STRING, {
    max: 1,
  });
  const migrationDb = drizzle(migrationClient);

  await migrate(migrationDb, {
    migrationsFolder: "./db/migrations/drizzle",
  });
  await migrationClient.end();
};

pushMigration();
