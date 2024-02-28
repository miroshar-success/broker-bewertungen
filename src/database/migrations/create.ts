/**
 * This script is responsible for create the SQL tables.
 * Run it via `npm run db:create`.
 */
require('dotenv').config();

import MigrationService from '../../services/migrationService';
import models from '../models';

const options = {
  database: models(),
};

const sequelize = options.database.sequelize;

const syncTables = () =>
  sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
      console.log(`FOREIGN_KEY_CHECKS = 0`);
      sequelize
        .query('DROP TABLE IF EXISTS `users`')
        .then(() => {
          console.log('Table `users` was dropped.');
          sequelize
            .query('SET FOREIGN_KEY_CHECKS = 0')
            .then(() => {
              console.log('FOREIGN_KEY_CHECKS = 1');
              sequelize
                .sync()
                .then(() => {
                  console.log('Sync OK');
                  new MigrationService(options)
                    .convertImages()
                    .then(() => {
                      process.exit();
                    })
                    .catch((error) => {
                      console.log(error);
                      process.exit(1);
                    });
                })
                .catch((error) => {
                  console.error(error);
                  process.exit(1);
                });
            })
            .catch((error) => {
              console.log(error);
              process.exit(1);
            });
        })
        .catch((error) => {
          console.log(error);
          process.exit(1);
        });
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });

const fixQueries = [
  'ALTER TABLE `blog_entries` MODIFY COLUMN `author_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL AFTER `metakeywords`',
  'ALTER TABLE `broker_articles` MODIFY COLUMN `author_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL AFTER `name_normalized`',
  'ALTER TABLE `brokers` MODIFY COLUMN `author_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL AFTER `pdf`',
  'ALTER TABLE `categories` MODIFY COLUMN `author_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL AFTER `title`',
  'ALTER TABLE `pages` MODIFY COLUMN `author_id` bigint(20) UNSIGNED NULL DEFAULT NULL AFTER `pdf`',
  'UPDATE `blog_comments` SET `user_id` = NULL',
  'UPDATE `blog_entries` SET `author_id` = NULL WHERE `author_id` NOT IN (SELECT `id` FROM `authors`)',
  'UPDATE `broker_articles` SET `author_id` = NULL WHERE `author_id` NOT IN (SELECT `id` FROM `authors`)',
  'UPDATE `broker_posts` SET `user_id` = NULL',
  'UPDATE `brokers` SET `author_id` = NULL WHERE `author_id` NOT IN (SELECT `id` FROM `authors`)',
  'UPDATE `categories` SET `author_id` = NULL WHERE `author_id` NOT IN (SELECT `id` FROM `authors`)',
  'UPDATE `pages` SET `author_id` = NULL WHERE `author_id` NOT IN (SELECT `id` FROM `authors`)',
  'UPDATE `pages` SET `page_warning_id` = NULL WHERE `page_warning_id` NOT IN (SELECT `id` FROM `page_warnings`)',
];

const runNextQuery = (index = 0) => {
  if (index >= fixQueries.length) {
    syncTables();
    return;
  }
  const query = fixQueries[index];
  console.log(`> ${query}`);
  sequelize
    .query(query)
    .then(() => {
      console.log('@ SUCCESS');
      runNextQuery(index + 1);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

runNextQuery();
