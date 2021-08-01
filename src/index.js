import cli from './cli/cli.js'
import { Vault }  from './services/vault.js'
import {Db} from './storage/db.js';
import { Command } from 'commander';
import Logger from './services/logger.js';
import inquirer from "inquirer";


const logger = new Logger(); //instantiate logger service

const program = new Command();//instantiate CLI commands service

const db = new Db();//Instantiate in-memory DB
await db.readDb(); //Read data from DB

const v = new Vault(logger, db);//Instantiate Vault service.

cli(program, v, inquirer);