import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the path to the .env file
const envPath = resolve(__dirname, "../../.env");

// Load environment variables from the .env file
config({ path: envPath });

const prisma = new PrismaClient();

async function main() {
  // await prisma.task.deleteMany();
  // create superadmings or admins here:
  // await prisma.user.create({})
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
