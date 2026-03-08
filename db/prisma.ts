import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not set. Prisma client might fail if it needs to connect to the database.");
}

const adapter = connectionString ? new PrismaNeon({ connectionString }) : undefined;

export const prisma = adapter 
  ? new PrismaClient({ adapter }) 
  : new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://dummy:dummy@localhost:5432/dummy?sslmode=require"
        }
      }
    });



