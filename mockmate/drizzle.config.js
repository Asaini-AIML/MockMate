/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",  // Make sure this path is correct
    dialect: 'postgresql',  // This should be fine
    dbCredentials: {
        url: 'postgresql://maockdb_owner:pqcSOFR3Lv1H@ep-aged-butterfly-a5nlfqin.us-east-2.aws.neon.tech/maockdb?sslmode=require'
    }
};
