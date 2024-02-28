/**
 * This module creates the Sequelize to the database and
 * exports all the models.
 */
import fs from 'fs';
import path from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { getConfig } from '../../config';
const highlight = require('cli-highlight').highlight;

const basename = path.basename(module.filename);

function models() {
  const database = {} as any;

  let sequelize = new (<any>Sequelize)(
    getConfig().DATABASE_DATABASE,
    getConfig().DATABASE_USERNAME,
    getConfig().DATABASE_PASSWORD,
    {
      host: getConfig().DATABASE_HOST,
      port: getConfig().DATABASE_PORT,
      dialect: getConfig().DATABASE_DIALECT,
      logging:
        getConfig().DATABASE_LOGGING === 'true'
          ? (log) =>
              console.log(
                highlight(log, {
                  language: 'sql',
                  ignoreIllegals: true,
                }),
              )
          : false,
    },
  );

  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-3) === '.js' ||
          file.slice(-3) === '.ts')
      );
    })
    .forEach(function (file) {
      const model = require(path.join(
        __dirname,
        file,
      )).default(sequelize, DataTypes);
      database[model.name] = model;
    });

  Object.keys(database).forEach(function (modelName) {
    if (database[modelName].associate) {
      database[modelName].associate(database);
    }
  });

  database.sequelize = sequelize;
  database.Sequelize = Sequelize;

  return database;
}

export default models;
