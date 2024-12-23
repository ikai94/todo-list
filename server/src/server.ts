import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import * as process from 'node:process';
import { themeRouter } from './theme/theme.controller';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 4200;
const prisma = new PrismaClient()

async function main() {
  app.use(express.json());
  app.use(cors())
  app.use('/', themeRouter);

  app.listen(port, () => {
    console.log(`Server running ${port}`);
  });
}

main()
  .then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
