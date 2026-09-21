import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import fs from "fs";
import path from "path";

const uri =
    process.env.ATLAS_MONGODB_URI ||
    "PASTE_YOUR_ATLAS_URI_HERE";

const dbName = "fitpro-gym";

const importDirectory = path.join(
    process.cwd(),
    "database-export"
);

const client = new MongoClient(uri);

async function importDatabase() {
    try {
        await client.connect();

        console.log("Connected to MongoDB Atlas");

        const db = client.db(dbName);

        const files = fs
            .readdirSync(importDirectory)
            .filter((file) => file.endsWith(".json"));

        console.log(
            `Found ${files.length} export files`
        );

        for (const file of files) {
            const collectionName = path.basename(
                file,
                ".json"
            );

            const filePath = path.join(
                importDirectory,
                file
            );

            const fileContent = fs.readFileSync(
                filePath,
                "utf8"
            );

            const documents = EJSON.parse(
                fileContent
            );

            if (!Array.isArray(documents)) {
                console.log(
                    `Skipping ${collectionName}: invalid data`
                );
                continue;
            }

            const collection =
                db.collection(collectionName);

            const existingCount =
                await collection.countDocuments();

            if (existingCount > 0) {
                console.log(
                    `Skipping ${collectionName}: Atlas already contains ${existingCount} documents`
                );
                continue;
            }

            if (documents.length > 0) {
                await collection.insertMany(
                    documents
                );
            }

            console.log(
                `Imported ${collectionName}: ${documents.length} documents`
            );
        }

        console.log(
            "\nAtlas database migration completed successfully."
        );
    } catch (error) {
        console.error(
            "Import failed:",
            error
        );

        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

importDatabase();