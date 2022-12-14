import path from 'path';
import Sequelize from 'sequelize';
import initModels from "./init-models.js";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const env = process.env.NODE_ENV || 'development';
import {config} from  '../config/config.js'
console.log(config);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = initModels(sequelize);

export {db, sequelize};
