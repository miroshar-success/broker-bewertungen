import {
  ensureDirectoryExistence,
  getRealPath,
} from '../../utils/pathUtils';
import { getConfig } from '../../config';
import { IServiceOptions } from '../IServiceOptions';
import { SitemapStream } from 'sitemap';
import BlogRepository from '../../database/repositories/blogRepository';
import BrokerArticleRepository from '../../database/repositories/brokerArticleRepository';
import BrokerRepository from '../../database/repositories/brokerRepository';
import CategoryRepository from '../../database/repositories/categoryRepository';
import fs from 'fs';
import PageRepository from '../../database/repositories/pageRepository';

export default class SitemapService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async refresh() {
    const filepath = getRealPath(getConfig().SITEMAP_PATH);
    const frontendUrl = String(getConfig().FRONTEND_URL);
    ensureDirectoryExistence(filepath);

    const sitemap = new SitemapStream({
      hostname: frontendUrl,
    });
    const writeStream = fs.createWriteStream(filepath);

    sitemap.pipe(writeStream);

    // #region static pages links
    sitemap.write({
      url: `${frontendUrl}`,
      changefreq: 'daily',
    });
    sitemap.write({
      url: `${frontendUrl}/blog`,
      changefreq: 'daily',
    });
    sitemap.write({
      url: `${frontendUrl}/broker-vergleich`,
      changefreq: 'daily',
    });
    sitemap.write({
      url: `${frontendUrl}/forex-cfd-broker-vergleich`,
      changefreq: 'daily',
    });
    // #endregion

    // #region categories links
    const { rows: categories } =
      await CategoryRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const category of categories) {
      sitemap.write({
        url: `${frontendUrl}${category.link}`,
        changefreq: 'daily',
      });
    }
    // #endregion

    // #region pages' links
    const { rows: pages } =
      await PageRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const page of pages) {
      sitemap.write({
        url: `${frontendUrl}${
          page.navigation?.link || page.link
        }`,
        changefreq: 'daily',
      });
      if (page.pdf) {
        sitemap.write({
          url: `${frontendUrl}${
            page.navigation?.link || page.link
          }.pdf`,
          changefreq: 'daily',
        });
      }
    }
    // #endregion

    // #region brokers' links
    const { rows: brokers } =
      await BrokerRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const broker of brokers) {
      sitemap.write({
        url: `${frontendUrl}/erfahrungsberichte/${broker.name_normalized}`,
        changefreq: 'daily',
      });
    }
    // #endregion

    // #region broker articles links
    const { rows: articles } =
      await BrokerArticleRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const article of articles) {
      if (article.broker) {
        sitemap.write({
          url: `${frontendUrl}/${article.broker.name_normalized}/${article.name_normalized}`,
          changefreq: 'daily',
        });
      }
    }
    // #endregion

    // #region blogs links
    const { rows: blogs } =
      await BlogRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const blog of blogs) {
      sitemap.write({
        url: `${frontendUrl}/blog/${blog.name_normalized}`,
        changefreq: 'daily',
      });
    }
    // #endregion

    sitemap.end();
    return true;
  }
}
