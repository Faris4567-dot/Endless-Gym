import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import fs from "fs";
import path from "path";

const uri = "mongodb://localhost:27017";
const dbName = "fitpro-gym";

const exportDirectory = path.join(
    process.cwd(),
    "database-export"
);

const client = new MongoClient(uri);

async function exportDatabase() {
    try {
        await client.connect();

        console.log("Connected to local MongoDB");

        const db = client.db(dbName);

        if (!fs.existsSync(exportDirectory)) {
            fs.mkdirSync(exportDirectory, {
                recursive: true,
            });
        }

        const collections = await db
            .listCollections()
            .toArray();

        console.log(
            `Found ${collections.length} collections`
        );

        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;

            const documents = await db
                .collection(collectionName)
                .find({})
                .toArray();

            const filePath = path.join(
                exportDirectory,
                `${collectionName}.json`
            );

            const json = EJSON.stringify(
                documents,
                null,
                2
            );

            fs.writeFileSync(
                filePath,
                json,
                "utf8"
            );

            console.log(
                `Exported ${collectionName}: ${documents.length} documents`
            );
        }

        console.log(
            "\nDatabase export completed successfully."
        );

        console.log(
            `Files saved to: ${exportDirectory}`
        );
    } catch (error) {
        console.error(
            "Export failed:",
            error
        );

        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

exportDatabase();