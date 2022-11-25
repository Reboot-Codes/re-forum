import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { logger } from './utils/logger';

const app = express();
const log = logger({ name: 'Main' });

app.use(cors());

function main() {
  app.listen(3001, () => {
    log.info(`Server started on port ${chalk.yellow('3001')}.`);
  });
}

main();
