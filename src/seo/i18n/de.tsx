import { getConfig } from '../../config';

const en = {
  common: {
    areYouSure: 'Are you sure?',
    cancel: 'Cancel',
    comment: 'Kommentare',
    content: 'Content',
    toComment: 'Kommentare Abgeben',
    continue: 'Continue',
    destroy: 'Delete',
    detail: 'Detail',
    discard: 'Discard',
    edit: 'Edit',
    email: 'E-mail',
    end: 'End',
    export: 'Export to Excel',
    filters: 'Filters',
    import: 'Import',
    more: 'More',
    mustSelectARow: 'Must select a row',
    name: 'Name',
    new: 'New',
    no: 'Nein',
    noCommit: 'Keine Kommentare. Sei der Erste!',
    noDataToExport: 'No data to export',
    noRecord: 'No Record',
    noReviews:
      'Für {0} wurden noch keine Bewertungen oder Erfahrungen erfasst. Seien Sie der Erste, der seine Erfahrungen über {0} schreibt und bewerten Sie {0} damit andere Benutzer sich ein besseres Bild über {0} machen können.',
    or: 'or',
    pause: 'Pause',
    rating: 'Bewertung',
    rebuild: 'Rebuild',
    recaptcha: 'ReCAPTCHA',
    reset: 'Reset',
    review: 'Erfahrungsbericht',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    send: 'Send',
    sitemap: 'Sitemap',
    spam: 'Spam',
    start: 'Start',
    view: 'View',
    writeComment: 'Kommentar verfassen',
    writeReview: 'Erfahrungsbericht schreiben',
    yes: 'Ja',
  },

  app: {
    title: 'broker-bewertungen.de',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Material UI Configurator',
      description: 'See our dashboard options.',
      sidenavColor: 'Colors',
      sidenavType: {
        title: 'Sidenav Type',
        description:
          'Choose between different sidenav types.',
        dark: 'Dark',
        transparent: 'Transparent',
        white: 'white',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Light / Dark',
    },
  },

  collapses: {
    affiliateLink: {
      menu: 'Affiliate links',
    },
    author: {
      menu: 'Authors',
    },
    blog: {
      menu: 'Blogs',
    },
    brokerPost: {
      menu: 'Posts',
    },
    generalPage: {
      menu: 'General Pages',
    },
    pageWarning: {
      menu: 'Warning Pages',
    },
    routes: {
      menu: 'Routes',
    },
    promotion: {
      menu: 'Promotion',
    },
    pageRelatedLink: {
      menu: 'Page Related Link',
    },
    sitePage: {
      menu: 'Site Pages',
    },
    expertAdvisorTest: {
      menu: 'Expert Advisor Tests',
    },
  },

  entities: {
    affiliateLink: {
      name: 'affiliateLink',
      label: 'All Affiliate links',
      menu: 'Affiliate links',
      exporterFileName: 'affiliateLink_export',
      list: {
        menu: 'Affiliate links',
        title: 'Affiliate links',
      },
      create: {
        success: 'Affiliate link successfully saved',
      },
      update: {
        success: 'Affiliate link successfully saved',
      },
      destroy: {
        success: 'Affiliate link successfully deleted',
      },
      destroyAll: {
        success: 'Affiliate link(s) successfully deleted',
      },
      edit: {
        title: 'Edit Affiliate link',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        hash: 'Hash',
        link: 'Link',
        display_hash: 'Display Hash',
        meta_info: 'Meta Info',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Affiliate link',
      },
      view: {
        title: 'View Affiliate link',
      },
      importer: {
        title: 'Import Affiliate links',
        fileName: 'affiliateLink_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    author: {
      name: 'author',
      label: 'All Authors',
      menu: 'Authors',
      exporterFileName: 'author_export',
      list: {
        menu: 'Authors',
        title: 'Authors',
      },
      create: {
        success: 'Author successfully saved',
      },
      update: {
        success: 'Author successfully saved',
      },
      destroy: {
        success: 'Author successfully deleted',
      },
      destroyAll: {
        success: 'Author(s) successfully deleted',
      },
      edit: {
        title: 'Edit Author',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        link: 'Link',
        image: 'Image',
        description: 'Description',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Author',
      },
      view: {
        title: 'View Author',
      },
      importer: {
        title: 'Import Authors',
        fileName: 'author_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    blog: {
      name: 'blog',
      title: 'Blog',
      label: 'All Blogs',
      menu: 'Articles',
      exporterFileName: 'blog_export',
      list: {
        menu: 'Blogs',
        title: 'Blogs',
      },
      create: {
        success: 'Blog successfully saved',
      },
      update: {
        success: 'Blog successfully saved',
      },
      destroy: {
        success: 'Blog successfully deleted',
      },
      destroyAll: {
        success: 'Blog(s) successfully deleted',
      },
      edit: {
        title: 'Edit Blog',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        link: 'Link',
        comment: 'Comments',
        deleted: 'Deleted',
        spam: 'Spam',
        review_required: 'Review required',
        pagetitle: 'Page title',
        metadescription: 'Meta Description',
        metakeywords: 'Meta Keywords',
        author: 'Author',
        blog_image: 'Upload teaser logo',
        teaser: 'teasers',
        name: 'Name',
        content: 'Contents',
        activated: 'Activated',
        brokers: 'Linked Brokers',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Blog',
      },
      view: {
        title: 'View Blog',
      },
      importer: {
        title: 'Import Blogs',
        fileName: 'blog_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    contact: {
      fields: {
        name: 'Name',
        email: 'E-Mail',
        subject: 'Betreff',
      },
    },

    blogComment: {
      name: 'comment',
      label: 'All Comments',
      menu: 'Comments',
      exporterFileName: 'comment_export',
      list: {
        menu: 'Comments',
        title: 'Comments',
      },
      create: {
        success: 'Comment successfully saved',
      },
      update: {
        success: 'Comment successfully saved',
      },
      review: {
        success: 'Comment successfully reviewed',
      },
      reviewAll: {
        success: 'Comment(s) successfully reviewed',
      },
      spam: {
        success: 'Comment successfully spammed',
      },
      spamAll: {
        success: 'Comment(s) successfully spammed',
      },
      destroy: {
        success: 'Comment successfully deleted',
      },
      destroyAll: {
        success: 'Comment(s) successfully deleted',
      },
      edit: {
        title: 'Edit Comment',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        deleted: 'Deleted',
        spam: 'Spam',
        review_required: 'Review Required',
        content: 'Teasers',
        author: 'Author',
        email: 'Email',
        activated: 'Activated',
        blog: 'Blog',
        created: 'Created At',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Comment',
      },
      view: {
        title: 'View Comment',
      },
      importer: {
        title: 'Import Comments',
        fileName: 'comment_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    brokerPost: {
      name: 'Posts',
      label: 'All Posts',
      menu: 'Posts',
      exporterFileName: 'post_export',
      list: {
        menu: 'Posts',
        title: 'Posts',
      },
      create: {
        success: [
          'Vielen Dank für deine Bewertung von {0}. Mit deiner Hilfe können so viele Trader die guten Broker schnell von den schlechteren unterscheiden und sich im besten Fall teures Lehrgeld sparen.',
          'Um sicherzugehen, dass es sich bei deiner Bewertung nicht um eine Fake Bewertung oder Eigenwerbung eines Brokers handelt und das Bewertungsbild so objektiv wie möglich bleibt, prüfen wir jede Bewertung erst, bevor wir diese veröffentlichen.',
          'Vielen Dank für deine Mithilfe!',
          'Dein Team von broker-bewertungen.de',
        ].join('<br/><br/>'),
        comment: 'Post successfully saved',
      },
      update: {
        success: 'Post successfully saved',
      },
      review: {
        success: 'Post successfully reviewed',
      },
      reviewAll: {
        success: 'Post(s) successfully reviewed',
      },
      spam: {
        success: 'Post successfully spammed',
      },
      spamAll: {
        success: 'Post(s) successfully spammed',
      },
      destroy: {
        success: 'Post successfully deleted',
      },
      destroyAll: {
        success: 'Post(s) successfully deleted',
      },
      edit: {
        title: 'Edit Post',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        deleted: 'Deleted',
        spam: 'Spam',
        review_required: 'Review Required',
        content: 'Teasers',
        author: 'Author',
        email: 'Email',
        activated: 'Activated',
        broker: 'Broker',
        created: 'Created At',
        rating: 'Bewertung',
        review: 'Berichte',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Post',
      },
      view: {
        title: 'View Post',
      },
      importer: {
        title: 'Import Posts',
        fileName: 'post_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    broker: {
      name: 'broker',
      label: 'All Brokers',
      menu: 'Brokers',
      exporterFileName: 'broker_export',
      list: {
        menu: 'Brokers',
        title: 'Brokers',
      },
      create: {
        success: 'Broker successfully saved',
      },
      update: {
        success: 'Broker successfully saved',
      },
      destroy: {
        success: 'Broker successfully deleted',
      },
      destroyAll: {
        success: 'Broker(s) successfully deleted',
      },
      edit: {
        title: 'Edit Broker',
      },
      characteristics: {
        fields: {
          licensed_broker: 'Lizensierter Broker',
          minimum_deposit: 'Mindesteinlage',
          bonus: 'Bonus',
          accounting_bank: 'Kontoführende Bank',
          withholding_tax: 'Abgeltungssteuer',
        },
        tooltip: {
          licensed_broker:
            'Verfügt der Broker über eine eigene Brokerlizenz oder handelt es sich um einen Introducing Broker. Bei IBs muss man sich bei Umstimmigkeiten immer mit der Muttergesellschaft an die man vermittelt wurde auseinander setzen',
          customer_funds_separated:
            'Bei einer Insolvenz des Brokers haben Gläubiger nur Zugriff auf das Firmenvermögen.Werden die Kundengelder getrennt vom Betriebsvermögen gehalten, sind diese bei einer Insolvenz des Brokers vor dem Zugriff der Gläubiger geschützt und können an Kunden zurück fließen',
          bonus:
            'Einige Broker bieten ihren Kunden Bonuszahlungen in Form von Willkommensbonus, Einzahlungsbonus oder ähnlichem an.',
          accounting_bank:
            'Auf welcher Bank und in welchem Land verwahrt der Broker die Gelder der Kunden',
          obligation_to_make_additional_payments:
            'Schließt ein Broker die Nachschusspflicht nicht ausdrücklich aus, ist es unter Umständen möglich mehr als seine eingezahlte Einlage zu verlieren, wenn das Konto aufgrund starker Kursschwankungen ins Minus gerät.Wir empfehlen, sich in diesem Fall noch einmal direkt beim jeweiligen Broker zu erkundigen',
        },
      },
      comparison: {
        title: 'Tool zum Vergleich von Online Brokern',
        vsTitle:
          '{0} vs. {1} im Forex- und CFD-Broker-Vergleich',
        metaDescription:
          'Vergleichen Sie Forex- und CFD-Broker miteinander und finden Sie so den besten Broker für Ihre Bedürfnisse.',
        metaVsDescription:
          'Vergleichen Sie {0} und {1} miteinander und finden Sie so den besten Broker für Ihre Bedürfnisse.',
        description:
          'Mit unserem Broker Vergleichstool können Sie schnell und einfach alle bei uns gelisteten Forex und CFD Broker in allen Kategorien miteinander vergleichen.und so problemlos den Broker finden der für Sie am besten geeignet ist. Zudem finden Sie zu fast jedem Broker Erfahrungen und Bewertungen von Tradern, um ihnen die Auswahl noch weiter zu erleichtern.',
        selectBrokers: 'Bitte auswählen',
        logo: 'Logo',
        compare: 'Broker vergleichen!',
        brokerA: 'Broker A',
        brokerB: 'Broker B',
        brokerType: 'Broker-Typ',
        overallRating: 'Gesamtbewertung',
        customerReviews: 'Kundenbewertungen',
        links: 'Links',
        brokerFeature: 'Besonderheiten',
        scalping: 'Scalping',
        region: {
          regulationAndDepositInsurance:
            'Regulierung und Einlagensicherung',
          profileAndContact: 'Broker Profil und Kontakt',
          tradableMarketsAndProducts:
            'Handelbare Märkte und Produkte bei {0} und {1}',
          spreadsAndFees:
            'Spreads und Gebührenvergleich von {0} und {1}',
          tradingPlatforms:
            'Handelsplatformen bei {0} und {1}',
          service: 'Service bei {0} und {1}',
        },
        single: {
          tradableMarketsAndFees:
            'Handelbare Märkte und Gebühren bei {0}',
        },
        awards: 'Aus-zeichnungen',
        regulation: 'Regulierung',
        tooltip: {
          regulation:
            'Von welcher Aufsichtsbehörde wird der Broker reguliert und überwacht ? Wir empfehlen nur bei Brokern zu handeln, die entweder von der BaFin, der FCA oder der CySEC reguliert werden.',
          depositProtection:
            'Die Einlagensicherung gibt an, bis zu welchem Betrag ihre Einlagen im Falle einer Insolvenz des Brokers geschützt sind.',
        },
        depositProtection: 'Einlagen-sicherung',
        profile: 'Broker-Profil',
        address: 'Anschrift',
        contact: 'Kontakt',
        contacts: {
          phone: 'Telefon',
          fax: 'Fax',
          email: 'E-Mail',
        },
        checkbox: {
          name: {
            TRADE_PLATFORM: 'Handelsplatformen',
            FREE_DEMO_ACCOUNT: 'Kostenloses Demokonto',
            METATRADER_4: 'MetaTrader 4',
            METATRADER_5: 'MetaTrader 5',
            WEB_PLATFORM: 'Web Platform',
            MOBILE_TRADING_APPS: 'Mobile Trading Apps',
            HEDGING_ALLOWED: 'Hedging möglich',
            ADDITIONAL_TRADE_TOOLS:
              'zusätzliche Tools für den Handel',
            AUTOMATED_TRADE_POSSIBLE:
              'automatisierter Handel Möglich',
            API_INTERFACES: 'API Schnittstellen',
            RATE_ALARMS: 'Kursarlarme per SMS oder E-Mail',
            PLATFORM_TUTORIALS:
              'Anleitungen zur Trading Platform',
            LAYOUT_SAVEABLE: 'Layout speicherbar',
            ONE_CLICK_TRADING: 'One Click Trading',
            TRADE_FROM_CHART: 'Handeln aus dem Chart',
            ALL_POSITIONS_CLOSEABLE:
              'Alle Positionen auf einmal schließbar',
            GUARANTEED_STOPS:
              'Garantierte Stops und Limit möglich',
            PHONE_TRADE_POSSIBLE:
              'Telefonischer Handel möglich',
            COMMISSIONS: 'Kommissionen',
            IMPORTANT_MARKET_SPREADS:
              'Spreads der wichtigsten Märkte',
            COST_FOR_OVERNIGHT:
              'Finanzierungsposten für Übernachtpositionen',
            FEES_FOR_DEPOSIT_DISBURSAL:
              'Gebühren für Einzahlungen und Auszahlungen',
            FREE_ORDERCHANGE:
              'Kostenlose Orderänderungen oder Stornierungen',
            FREE_DEPOT: 'Depotführung kostenlos',
            NO_PLATFORM_FEES:
              'keine Gebühren für Plattform',
            GERMAN_SUPPORT: 'Deutscher Support',
            CONTACT: 'Kontaktmöglichkeiten',
            DAILY_TRADE_HELP:
              'Tägliche Handelsunterstützungen',
            GERMAN_WEBINAR:
              'Regelmäßige Webinare auf Deutsch verfügbar',
            GERMAN_SEMINAR:
              'Regelmäßige Seminare verfügbar',
            COACHINGS_AVAILABLE:
              'Einzelcoachings verfügbar',
            KNOWLEDGE_BASE: 'Umfangreicher Wissensbereich',
            TRADEABLE_MARKETS: 'Handelbare Märkte',
            MARGIN: 'Hebel/Margin',
            SOCIAL_TRADING: 'Social Trading',
            MANAGED_ACCOUNTS: 'Managed Accounts',
            INSTANT_EXECUTION:
              'Instant Execution (keine Requotes)',
            POSITIVE_SLIPPAGE_POSSIBLE:
              'positive Slippage möglich',
            ECN_ORDER_EXECUTION: 'ECN Orderausführung',
            LIQUIDITY_PRODIVER: 'Liquiditätsprovider',
            MICRO_LOTS: 'Mini- oder MicroLots möglich',
            INDEX_CFD_TRADEABLE_BELOW_POINT:
              'Index-CFDs ab 1 € oder weniger pro Punkt handelbar',
            RATE_SWITCH_24_5_INDEX_CFD:
              '24/5 Kursstellung bei Index-CFDs',
            NO_FINANCIAL_COST_INDEX_CFD:
              'keine Finanzierungskosten auf Index-CFDs',
            NO_FINANCIAL_COST_RAW_MATERIAL_CFD:
              'keine Finanzierungskosten auf Rohstoff-CFDs',
            CFD_CONTRACTS_AUTOMATIC_ROLL:
              'CFD Kontrakte werden automatisch gerollt',
            REAL_STOCKS_CFD_SPREADS:
              'Börsenechte Aktien CFD Spreads',
            DMA_STOCKS: 'DMA Aktien CFDs',
            MINIMAL_ORDERSIZE_STOCKS:
              'Minimale Ordergröße Aktien CFDs',
            COMPANY: 'Unternehmen',
            OFFICE_IN_GERMANY: 'Büro in Deutschland',
            BONUS: 'Bonus',
            REGULATION_AND_DEPOSIT_SECURITY:
              'Regulierung und Einlagensicherung',
            RESERVE_LIABILIRY: 'Nachschusspflicht',
            INTEREST_ON_DEPOSIT: 'Zinsen auf Kontoeinlage',
            WITHOLDING_TAX: 'Abgeltungssteuer',
            SEGREGATED_ACCOUNTS:
              'Kundengelder getrennt (segregated Accounts)',
            ACCOUNT_CURRENCIES:
              'Währungen für Kontoführung',
            POSIBILITIES_FOR_WITHDRAWALS:
              'Möglichkeiten für Einzahlungen und Auszahlungen',
          },
          tooltip: {
            BONUS:
              'Einige Broker bieten ihren Kunden Bonuszahlungen in Form von Willkommensbonus, Einzahlungsbonus oder ähnlichem an.',
            RESERVE_LIABILIRY:
              'Schließt ein Broker die Nachschusspflicht nicht ausdrücklich aus, ist es unter Umständen möglich mehr als seine eingezahlte Einlage zu verlieren, wenn das Konto aufgrund starker Kursschwankungen ins Minus gerät.Wir empfehlen, sich in diesem Fall noch einmal direkt beim jeweiligen Broker zu erkundigen',
            SEGREGATED_ACCOUNTS:
              'Bei einer Insolvenz des Brokers haben Gläubiger nur Zugriff auf das Firmenvermögen.Werden die Kundengelder getrennt vom Betriebsvermögen gehalten, sind diese bei einer Insolvenz des Brokers vor dem Zugriff der Gläubiger geschützt und können an Kunden zurück fließen',
            HEDGING_ALLOWED:
              'Hedging beispielsweise im MetaTrader erlaubt es Kunden in einem Konto im gleichen Markt gleichzeitig sowohl Long als auch Short Positionen eröffnen zu können.',
            SOCIAL_TRADING:
              'Einige Broker ermöglichen das Kopieren der Trades anderer Kunden.In der Regel kann man sich Statistiken zur Handelsaktivität und die Performance der anderern Trader ansehen und auf Wunsch die Trades dieser Trader auf das eigene Handelskonto "spiegeln". In der Regel werden die Positionsgrößen dann prozentual auf das eigene Kapital angepasst, so dass das Risiko und Moneymanagement von Signalgeber und Signalnehmer in etwa gleich bleibt.',
            MANAGED_ACCOUNTS:
              'Managed Accounts sind Konten, bei denen dritte ihr Kapital für Sie verwalten und anlegen.Der Verwalter verfügt über eine Vollmacht desKunden durch eigenständigen Handel Gewinne im Auftrag des Kunden zu erzielen.Im Regelfall fällt dafür eine geringe Grundgebühr und eine Beteiligung an den erzieten Gewinnen an.',
            INSTANT_EXECUTION:
              'Requotes sind Preisvorschläge des Brokers die Sie erhalten, wenn der von ihnen gewünschte Kurs sich während dem Absenden der Order bei ihnen und dem Eintreffen beim Broker geändert hat.Diesen Preisvorschlag können Sie akzeptieren oder ablehnen. Bei Instant Execution dürfen Requotes nicht vorkommen.',
            ECN_ORDER_EXECUTION:
              'Bei ECN/STP Brokern werden die Orders im Gegensatz zu Market-Makern nicht von einem Dealing Desk bearbeitet, sondern direkt an den Interbankenmarkt weitergeleitet.Das Resultat sind häufig schnellere Orderausführungen und bessere Spreads.Jedoch wird hier meist zusätzlich zum Spread noch eine Ordergebühr fällig.',
            LIQUIDITY_PRODIVER:
              'An welche Liquiditätsprovider (LPs) werden die Orders zu 100% weitergeleitet',
            INDEX_CFD_TRADEABLE_BELOW_POINT:
              'Kann der DAX30 Index mit 1 Euro oder weniger pro Punkt gehandelt werden ?',
            RATE_SWITCH_24_5_INDEX_CFD:
              'Einige Broker bieten die Möglichkeit auch nach Handelsschluss noch Orders zu platzieren.Meist werden hier die Spreads erweitert aber ein ausserbörslicher Handel ist möglich, um auf eventuelle Nachrichten reagieren zu können.',
            NO_FINANCIAL_COST_INDEX_CFD:
              'Einige Broker bieten ihren Kunden die Möglichkeit Positionen in Index-CFDs über Nacht zu halten ohne dafür Finanzierungskosten zahlen zu müssen',
            NO_FINANCIAL_COST_RAW_MATERIAL_CFD:
              'Einige Broker bieten ihren Kunden die Möglichkeit Positionen in Rohstoff-CFDs über Nacht zu halten ohne dafür Finanzierungskosten zahlen zu müssen',
            REAL_STOCKS_CFD_SPREADS:
              'Börsenechte 1:1 Spreads sind so ziemlich das Optimum für den Aktien-CFD handel, da diese eine faire Orderausführung und weitere Kosten erlauben.',
            DMA_STOCKS:
              'DMA (Direct Market Access) bedeutet Sie erhalten direkten Marktzugang zu den wichtigsten Börsen der Welt und können so die klassischen Vorteile des CFD Handels, wie den Handel auf Margin mit Hebelwirkung nutzen, wobei ihre Orders dennoch wie beim Handel von echten Aktien direkt an der jeweiligen Börse ausgeführt werden',
            ALL_POSITIONS_CLOSEABLE:
              'Die Handelsplattform erlaubt dass Schließen aller Positionen zum gleichen Zeitpunkt.',
          },
        },
      },
      market: {
        title: 'Handelbare Märkte und Gebühren bei {0}',
        forex_trading_at_activities:
          'Forex Trading bei {0}',
        cfd_trading_at_activTrades: 'CFD Trading bei {0}',
      },
      platform: {
        title: 'Handelsplattformen von {0}',
        order_options: 'order options',
        order_types: 'Ordertypen',
      },
      spread: {
        title: 'Spreads bei {0}',
      },
      service: {
        title: 'Service bei {0}',
        homepage: 'Homepage',
        contact: 'Kontakt',
        address: 'Anschrift',
        training_opportunities:
          'Weiterbildungsmöglichkeiten',
      },
      fields: {
        // #region Broker
        id: 'Id',
        idRange: 'Id #',
        navigation: 'Main Navigation',
        name: 'Name',
        name_normalized: 'Link',
        activated: 'Activated',
        is_broker: 'Is Broker',
        is_compareable: 'Show in comparison list',
        top_broker: 'Top Broker',
        top_binary_broker: 'Top Binary Broker',
        top_forex_broker: 'Top Forex Signal Provider',
        featured_broker: 'Featured Broker',
        pdf: 'Download PDF',
        author: 'Author',
        author_name: 'Author Name',
        author_link: 'Author link',
        // #endregion

        // #region Broker's Categories
        categories: 'Categories',
        categories_in_top_lists:
          'Show in top lists of these categories',
        // #endregion

        // #region Broker Metadata
        metadata: 'Metadata',
        homepage: 'Homepage',
        homepage_title: 'homepage_title',
        homepage_impression: 'Impression Script',
        broker_type: 'Broker-Typ',
        description: 'Description',
        teaser: 'Teaser Text',
        demo_url: 'Demo account',
        account_url: 'Live Account',
        maximum_leverage: 'Maximum Leverage',
        minimum_deposit: 'Mindesteinlage',
        minimum_deposit_short:
          'Mindesteinlage (Short For Overview)',
        custodian_fees: 'Custody Fees',
        mobile_trading: 'Mobile Trading',
        phone_order: 'Telephone Trading',
        licensed_broker: 'Lizensierter Broker',
        withholding_tax: 'Withholding Tax',
        scalping_allowed: 'Scalping erlaubt',
        // #endregion

        // #region Upside
        upsides: 'Demo Account',
        upside: {
          type: 'Type',
          text: 'Text',
        },
        // #endregion

        // #region Regulatory Authority
        regulation: 'Regulierung',
        regulatory_authorities: 'Regulatory Authorities',
        regulatory_authority: {
          name: 'Name',
          abbreviation: 'Abbreviation',
          url: 'Homepage',
        },
        // #endregion

        // #region Deposit Guarantee
        deposit_guarantees: 'Einlagensicherung',
        deposit_guarantee: {
          name: 'Name',
          url: 'Homepage',
          text: 'Free Text',
        },
        // #endregion

        // #region Certificate
        certificates: 'Auszeichnungen',
        certificate: {
          name: 'Name',
          url: 'Homepage',
          image: 'Award Logo',
        },
        // #endregion

        // #region Spread
        spreads: 'Spreads',
        spread: {
          spread: 'Spread',
          url: 'Homepage',
          primary: 'Primary Spread',
        },
        // #endregion

        // #region particularities
        specialties: 'Besonderheiten',
        feature: {
          feature: 'Particularities Feature',
          url: 'Homepage',
        },
        // #endregion

        // #region Specialties
        features: 'Specialties',
        // feature: {
        //   feature: 'Special Feature',
        //   url: 'Homepage',
        // },
        // #endregion

        // #region Bank
        banks: 'Bank holding the account',
        bank: {
          name: 'Name',
          url: 'Homepage',
        },
        // #endregion

        // #region Phone
        phone: 'Phone',
        // #endregion

        // #region Fax
        fax: 'Fax',
        // #endregion

        // #region Email
        email: 'Email',
        // #endregion

        // #region Address
        addresses: 'Contact',
        address: {
          line_0: 'Address 1st line',
          line_1: 'Address 2nd line',
          line_2: 'Address 3rd line',
          line_3: 'Address 4th line',
          line_4: 'Address 5th line',
          line_5: 'Address 6th line',
        },
        // #endregion

        // #region Video
        video: 'Video',
        youtube_hash: 'Youtube Hash',
        youtube_hash_prefix:
          'https://www.youtube.com/watch?v=',
        youtube_hash_description:
          'All Youtube videos have a hash. This can be copied from the url.',
        // #endregion

        // #region Checkbox
        checkbox: {
          image_type: 'Image Type',
          items: 'Items',
          text: 'Text',
          url: 'URL',
          trade_platform: 'Trade Platform',
          free_demo_account: 'Free Demo Account',
          metatrader_4: 'Meta Trader 4',
          metatrader_5: 'Meta Trader 5',
          web_platform: 'Web Platform',
          mobile_trading_apps: 'Mobile Trading Apps',
          hedging_allowed: 'Hedging Allowed',
          additional_trade_tools:
            'Additional Tools For Trading',
          automated_trade_possible:
            'Automated Trade Possible',
          api_interfaces: 'API Interfaces',
          social_trading: 'Social Trading',
          rate_alarms: 'Rate Alarms Via SMS or Email',
          platform_tutorials: 'Trading Platform Guides',
          layout_saveable: 'Layout can be saved',
          one_click_trading: 'One Click Trading',
          trade_from_chart: 'Trading from the chart',
          all_positions_closeable:
            'All positions closable at once',
          guaranteed_stops:
            'Guaranteed stops and limit possible',
          phone_trade_possible:
            'Telephone trading possible',
          commissions: 'Commissions',
          important_market_spreads:
            'Spreads of major markets',
          cost_for_overnight:
            'Funding items for overnight positions',
          fees_for_deposit_disbursal:
            'Deposit and withdrawal fees',
          free_orderchange:
            'Free order changes or cancellations',
          free_depot: 'Account management free of charge',
          no_platform_fees: 'No fees for platform',
          german_support: 'German support',
          contact: 'Contact Options',
          daily_trade_help: 'Daily trading supports',
          german_webinar:
            'Regular webinars available in German',
          german_seminar: 'Regular seminars available',
          coachings_available:
            'Individual coaching available',
          knowledge_base: 'Extensive knowledge area',
          tradeable_markets: 'Tradeable Markets',
          margin: 'Leverage/Margin',
          managed_accounts: 'Managed Accounts',
          instant_execution:
            'Instant execution (no requotes)',
          positive_slippage_possible:
            'Positive Slippage Possible',
          ecn_order_execution: 'ECN Order Execution',
          liquidity_prodiver: 'Liquidity Provider',
          micro_lots: 'Mini or micro lots possible',
          index_cfd_tradeable_below_point:
            'Index CFDs tradable from €1 or less per point',
          rate_switch_24_5_index_cfd:
            '24/5 quotes on index CFDs',
          no_financial_cost_index_cfd:
            'No Financing Costs on Index CFDs',
          no_financial_cost_raw_material_cfd:
            'No Financing Costs on Commodity CFDs',
          cfd_contracts_automatic_roll:
            'CFD contracts are automatically rolled',
          real_stocks_cfd_spreads:
            'Listed shares CFD spreads',
          dma_stocks: 'DMA share CFDs',
          minimal_ordersize_stocks:
            'Minimum order size Share CFDs',
          company: 'company',
          office_in_germany: 'Office in Germany',
          bonus: 'Bonus',
          regulation_and_deposit_security:
            'Regulation And Deposit Insurance',
          reserve_liabiliry:
            'Obligation to make additional payments',
          interest_on_deposit:
            'Interest on account deposit',
          witholding_tax: 'witholding_tax',
          segregated_accounts:
            'Customer funds separated (segregated accounts)',
          account_currencies: 'Account Currencies',
          posibilities_for_withdrawals:
            'Opportunities for deposits and withdrawals',
        },
        // #endregion

        // #region Order Types
        order_types: 'Order Types',
        // #endregion

        // #region Creteria
        creteria: {
          activated: 'Activated',
          body: 'Broker Criteria',
        },
        // #endregion

        // #region Minimum Trading Unit
        minimum_trading_units: 'Smallest tradable units',
        // #endregion

        // #region Currency Pair
        currency_pairs: 'Currency pairs',
        currency_pair: {
          currency: 'Currency Pair',
          url: 'Homepage',
        },
        // #endregion

        // #region Trade Platform
        trade_platforms: 'Trading Platforms',
        trade_platform: {
          name: 'Name',
          url: 'Homepage',
        },
        // #endregion

        // #region Trade Platform
        trade_stores: 'Trade Offers',
        trade_store: {
          name: 'Name',
          url: 'Homepage',
        },
        // #endregion

        // #region Deposit
        deposits: 'Deposit Options',
        deposit: {
          deposit: 'Deposit Option',
          url: 'Homepage',
        },
        // #endregion

        // #region Forex Signal
        forex_signal: {
          text: 'Text',
          url: 'URL',
          costs: 'Costs',
          notifications: 'Signal Sending',
          traded_markets: 'Traded Markets',
          investment_horizon: 'Investment Horizon',
          trading_signal_amount:
            'Frequency of trading signals',
          prodiver: 'Offerer',
          test_posibilities: 'Test option',
          test_posibilities_tick: 'Test option hook',
          beginners_level: 'Suitable for beginners',
        },
        // #endregion

        broker_image: {
          top_broker_logo: 'Top Broker Logo',
          top_broker_horizontal_logo:
            'Top Broker Horizontal Logo',
          broker_regulation_image: 'Regulatory Logo',
          broker_logo: 'Listing Logo',
          broker_detail_logo: 'Detail Logo',
        },
      },
      tabs: {
        broker: 'Broker',
        overview: 'Broker Übersicht',
        characteristics: 'Steckbrief',
        platform: 'Plattform',
        markets: 'Märkte',
        spreads: 'Spreads',
        service: 'Service',
        test: 'Test',
        old: 'Old',
        articles: 'Articles',
        forexSignal: 'Forex Signal',
      },
      enumerators: {
        upside: {
          type: {
            UPSIDE: 'Upside',
            DOWNSIDE: 'Downside',
          },
        },
        meta: {
          broker_type: {
            ECN: 'ECN Broker',
            MT4: 'MetaTrader Broker',
            MM: 'Market Maker',
            ECN_AND_MT4: 'ECN Broker (MT4)',
            MM_AND_MT4: 'Market Maker (MT4)',
            DMA: 'DMA Broker',
            STP: 'STP Broker',
            STP_AND_MT4: 'STP Broker (MT4)',
            MARKET_MAKER_AND_STP:
              'Market Maker / STP Broker',
            BITCOIN_EXCHANGE:
              'Exchange for bitcoin and cryptocurrencies',
          },
          withholding_tax: {
            WITHHOLDING_TAX_1:
              'Withheld directly by the broker',
            WITHHOLDING_TAX_2:
              'Muss vom Kunden selbst abgeführt werden',
          },
        },
        checkbox: {
          image_type: {
            NONE: 'No Image',
            PRO: 'Pro',
            CONTRA: 'Contra',
          },
        },
        order_type: {
          type: {
            'Fill Or Kill (FOK)': 'Fill Or Kill (FOK)',
            'Limit Buy': 'Limit Buy',
            'Limit Order': 'Limit Order',
            'Limit Sell': 'Limit Sell',
            'Market Order': 'Market Order',
            'One Cancels Other (OCO)':
              'One Cancels Other (OCO)',
            'Stop Buy': 'Stop Buy',
            'Stop Sell': 'Stop Sell',
            Stoploss: 'Stoploss',
            'Stoploss (garantiert)':
              'Stoploss (garantiert)',
            'Take Profit': 'Take Profit',
            'Trailing Stop': 'Trailing Stop',
          },
        },
        minimum_trading_unit: {
          minimum_trading_unit: {
            'Mini-Lots (0,1 Lot)': 'Mini-Lots (0,1 Lot)',
            'Micro-Lots (0,01 Lot)':
              'Micro-Lots (0,01 Lot)',
          },
        },
      },
      placeholders: {
        forexSignal:
          'Das Formular ist eingeschränkt, weil dieser Broker nur in der Forex Signal Broker Kategorie ist',
      },
      hints: {},
      new: {
        title: 'New Broker',
      },
      view: {
        title: 'View Broker',
      },
      importer: {
        title: 'Import Brokers',
        fileName: 'broker_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      text: {
        activeTraderExperience:
          "ActivTrade's trader experiences",
        introduction: 'Broker Vorstellung',
        freeDemoAccount: 'kostenloses Demokonto',
        nowTo: 'Jetzt zu {0}',
        portrait: 'Portrait',
        rating:
          '{0} von {1} Punkten aus {2} Bewertungen von Tradern',
        upsides: 'Fazit aus Trader Bewertungen',
        video: 'Broker Vorstellung',
        broker_comparison: 'Broker Comparison',
        broker_comparison_teaser:
          'Den besten Broker zu finden ist nicht immer leicht. Auf Broker-Bewertungen.de finden Sie einen Vergleich aller großen Broker sortiert nach Broker Typ, Regulierung, Trading Plattform und Einzahlungsmethoden. Dabei finden Sie zu jedem Broker User Bewertungen von echten Tradern, um ihnen die Suche zu erleichtern.',
      },
    },

    brokerArticle: {
      name: 'brokerArticle',
      label: 'All Broker Articles',
      menu: 'Broker Articles',
      exporterFileName: 'brokerArticle_export',
      list: {
        menu: 'Broker Articles',
        title: 'Broker Articles',
      },
      create: {
        success: 'Broker Article successfully saved',
      },
      update: {
        success: 'Broker Article successfully saved',
      },
      destroy: {
        success: 'Broker Article successfully deleted',
      },
      destroyAll: {
        success: 'Broker Article(s) successfully deleted',
      },
      edit: {
        title: 'Edit Broker Article',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        name_normalized: 'Link',
        pagetitle: 'Page Title',
        metadescription: 'Meta Description',
        metakeywords: 'Meta Keywords',
        activated: 'Activated',
        content: 'Content',
        author: 'Author',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Broker Article',
      },
      view: {
        title: 'View Broker Article',
      },
      importer: {
        title: 'Import Broker Articles',
        fileName: 'brokerArticle_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    expertAdvisorTest: {
      name: 'expert advisor test',
      label: 'All Expert Advisor Tests',
      menu: 'Expert Advisor Tests',
      exporterFileName: 'expert_advisor_test_export',
      list: {
        menu: 'Expert Advisor Tests',
        title: 'Expert Advisor Tests',
      },
      create: {
        success: 'Expert Advisor Test successfully saved',
      },
      update: {
        success: 'Expert Advisor Test successfully saved',
      },
      destroy: {
        success: 'Expert Advisor Test successfully deleted',
      },
      destroyAll: {
        success:
          'Expert Advisor Test(s) successfully deleted',
      },
      edit: {
        title: 'Edit Expert Advisor Test',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        navigation: 'Navigation',
        broker: 'Broker',
        meta_description: 'Meta Description',
        meta_keywords: 'Meta Keywords',
        start_date: 'start_date',
        metadata: 'Meta Data',
        screenshot: 'Screenshot',
        general: 'General',
        expert_advisor_test_image: 'Upload Logo',
        name: 'Name',
        description: 'Description',
        activated: 'Activated',
        pdf: 'Download PDF',
        deposit: 'Inlay',
        homepage: 'Homepage',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Expert Advisor Test',
      },
      view: {
        title: 'View Expert Advisor Test',
      },
      importer: {
        title: 'Import Expert Advisor Tests',
        fileName: 'expert_advisor_test_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    category: {
      name: 'category',
      label: 'All Categories',
      menu: 'Categories',
      exporterFileName: 'category_export',
      list: {
        menu: 'Categories',
        title: 'Categories',
      },
      create: {
        success: 'Category successfully saved',
      },
      update: {
        success: 'Category successfully saved',
      },
      destroy: {
        success: 'Category successfully deleted',
      },
      destroyAll: {
        success: 'Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Category',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        link: 'Link',
        title: 'Title',
        author: 'Author',
        teaser: 'Teaser',
        description: 'Description',
        target: 'Target',
        sort: 'Sort',
        activated: 'Activated',
        show_in_navigation: 'Show in navigation',
        show_in_footer: 'Show in the footer',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
      },
      placeholders: {
        description:
          '<p> Den besten {0} zu finden ist nicht immer leicht.<br />Auf Broker-Bewertungen.de finden Sie einen Vergleich aller großen {0} sortiert nach Broker Typ, Regulierung, Trading Plattform und Einzahlungsmethoden.<br />Dabei finden Sie zu jedem Broker User Bewertungen von echten Tradern, um ihnen die Suche zu erleichtern.</p>',
      },
      hints: {},
      new: {
        title: 'New Category',
      },
      view: {
        title: 'View Category',
      },
      importer: {
        title: 'Import Categories',
        fileName: 'category_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    home: {
      title: 'Broker Bewertungen von Tradern für Trader',
      subtitle:
        'Miteee bereits über 8000 Erfahrungsberichten & Bewertungen von Tradern sind wir das größte deutschsprachige Vergleichsportal für Online Broker und Trading Services - seit 2009!',
      description:
        'Wir sind selbst Trader und wissen wie schwer es ist einen guten Broker für den Handel von Forex, CFDs, Aktien, Futures oder Binären Optionen zu finden.Deshalb haben wir diese Seite ins Leben gerufen und alle Informationen zu den bekanntesten Brokern übersichtlich für unsere Besucher zusammengefasst.',
      top_brokers: 'Von Tradern am besten bewertete Broker',
      top_brokers_description:
        'Zusätzlich zu Handelsplattform, Spreads und Co. finden Sie in unserem Broker Vergleich auch Erfahrungsberichte von Tradern zu fast jedem Anbieter, um ihnen die Suche nach dem richtigen Anbieter etwas zu erleichtern und die guten Broker von den mittelmäßigen zu unterscheiden.',
      forex_broker: 'Forex Broker Vergleich',
      cfd_broker: 'CFD Broker Vergleich',
      cfd_broker_content:
        'Vergleichen Sie alle grossen CFD Broker miteinander und lesen Sie Erfahrungsberichte von Tradern zu jedem Broker',
      forex_broker_content:
        'Finden Sie informationen zu allen grossen Forex Brokern inklusive Erfahrungen und Bewertungen von Tradern',
      why_broker_comparison:
        'Warum einen Broker Vergleich machen ?',
      why_broker_comparison_content:
        'In der heutigen Zeit entscheiden sich immer mehr spekulativ eingestellte Trader inzwischen für den Handel&nbsp; mit Devisen, CFDs oder anderen Finanzinstrumenten. Dabei ist der Start nicht immer ganz einfach, da es in Vorfeld zahlreiche Informationen gibt, die zuvor gesammelt werden müssen. Dazu gehört auch, dass sich der Trader mit der Frage beschäftigt, über welchen Anbieter er überhaupt Devisen, CFDs und andere Finanzprodukte handeln möchte. Selten ist es nämlich die Hausbank oder eine Direktbank, die solche Handelsmöglichkeiten im Angebot hat. Stattdessen sind es spezielle Forex- und CFD-Broker, die Anlegern den Zugang zu diesen Anlageformen anbieten. Daher sollte jeder Trader und solche die es noch werden wollen sich mit der Frage auseinander setzen, wie er den für sich beten Broker finden kann. Diese Aufgabe lässt sich am einfachsten durch einen ausführlichen <strong>Broker Vergleich</strong> bewältigen.',
      find_right_broker:
        'Durch einen Broker Vergleich den richtigen Broker finden',
      find_right_broker_content: `Wir sind selbst Trader und wissen daher wie schwierig es sein kann einen guten und seriösen Broker für den CFD-&nbsp; , <a href="${
        getConfig().FRONTEND_URL
      }/aktien-broker-vergleich"><strong>Aktien</strong></a> oder <strong><a href="${
        getConfig().FRONTEND_URL
      }/forex-broker-vergleich">Forex Broker</a></strong> zu finden.Auf&nbsp; broker-bewertungen.de bieten wir die Möglichkeit, den für Sie richtigen Broker einfach und schnell anhand von zahlreichen Kriterien zu ermitteln. Zu diesem Zweck stellen wir Ihnen einen umfangreichen Forex- und <strong><a href="${
        getConfig().FRONTEND_URL
      }/cfd-broker-vergleich">CFD-Broker Vergleich</a></strong> zur Verfügung. Dabei handelt es sich nicht nur um einen reinen Konditionenvergleich. Neben den Handelskonditionen spielen bei uns vor allem die Bewertungen von Kunden zu den jeweiligen Anbietern eine Rolle.Egal ob Forex Broker, CFD Broker, Aktien Broker oder Signalservice, in unserer Datenbank finden Sie wahrscheinlich Bewertungen von Kunden zu fast jedem Anbieter. Dabei können Sie als Trader von diesen Empfehlungen, Erfahrungsberichten und auch von den Meinungen anderer profitieren und in ihren Broker Vergleich mit einfließen lassen. Deshalb stellen diese Informationen sicherlich eine wichtige Hilfe dar, damit auch Sie den richtigen Broker finden können. Unabhängig davon, ob Sie unsere Broker Vergleiche nutzen oder sich anderweitig informieren möchten, sollten Sie beim Gegenüberstellen der Anbieter diverse Punkte beachten. Sicherlich ist es an dieser Stelle hilfreich, dass Sie bereits einige <strong><a href="${
        getConfig().FRONTEND_URL
      }/forex-schule">Grundkenntnisse</a></strong> haben, wodurch sich die Broker unterscheiden, auf welche Merkmale zu achten ist und was einen guten Anbieter von einem mittelmäßigen oder sogar schlechten Broker unterscheidet.`,
      pay_attention_to_various:
        'Achten Sie beim Broker Vergleich auf diverse Kriterien',
      pay_attention_to_various_content:
        'Im Folgenden möchten wir etwas näher darauf eingehen, worauf Sie bei einem Broker Vergleich achten sollten und welche Kriterien sowie Merkmale von Bedeutung sind. Unter anderem sollten Sie sich in diesem Zusammenhang einige der folgenden Fragen stellen:',
      what_trading_broker_offer: '',
    },

    navigation: {
      name: 'navigation',
      label: 'Navigations',
      menu: 'Navigations',
      exporterFileName: 'navigation_export',
      list: {
        menu: 'Navigations',
        title: 'Navigations',
      },
      create: {
        success: 'Navigation successfully saved',
      },
      update: {
        success: 'Navigation successfully saved',
      },
      destroy: {
        success: 'Navigation successfully deleted',
      },
      destroyAll: {
        success: 'Navigation(s) successfully deleted',
      },
      edit: {
        title: 'Edit Navigation',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        name: 'Name',
        link: 'Link',
        title: 'Title',
        target: 'Target',
        sort: 'Sort',
        activated: 'Activated',
        show_user_logged_in: 'Show when user is logged in',
        show_in_navigation: 'Show in the navigation',
        type: 'Type',
        parent: 'Parent Navigation',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
        type: {
          NONE: 'None',
          FOREX_SCHOOL: 'Forex School',
          FOREX_STRATEGY: 'Forex Strategy',
          DOWNLOADS: 'Downloads',
          NEWS: 'News',
          OFFERS: 'Offers',
          MOST_READ: 'Most Read',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Navigation',
      },
      view: {
        title: 'View Navigation',
      },
      importer: {
        title: 'Import Navigations',
        fileName: 'navigation_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    news: {
      name: 'news',
      label: 'News',
      menu: 'News',
      exporterFileName: 'news_export',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News successfully saved',
      },
      update: {
        success: 'News successfully saved',
      },
      destroy: {
        success: 'News successfully deleted',
      },
      destroyAll: {
        success: 'News(s) successfully deleted',
      },
      edit: {
        title: 'Edit News',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        link: 'Link',
        meta_description: 'Meta Description',
        meta_keywords: 'Meta Keywords',
        name: 'Name',
        title: 'Title',
        body: 'Body',
        target: 'Target',
        teaser: 'Teaser',
        teaser_upload: 'Upload Teaser Logo',
        teaser_link: 'Teaser Link',
        teaser_title: 'Teaser Link Title',
        sort: 'Sort',
        activated: 'Activated',
        pdf: 'PDF',
        frontpage: 'Front Page',
        created: 'Created At',
        metadata: 'Metadata',
        page_content: 'Page Content',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New News',
      },
      view: {
        title: 'View News',
      },
      importer: {
        title: 'Import News',
        fileName: 'news_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    promotion: {
      name: 'promotion',
      label: 'Promotion',
      menu: 'Promotion',
      exporterFileName: 'promotion_export',
      list: {
        menu: 'Promotion',
        title: 'Promotion',
      },
      create: {
        success: 'Promotion successfully saved',
      },
      update: {
        success: 'Promotion successfully saved',
      },
      destroy: {
        success: 'Promotion successfully deleted',
      },
      destroyAll: {
        success: 'Promotion(s) successfully deleted',
      },
      edit: {
        title: 'Edit Promotion',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        link: 'Link',
        name: 'Name',
        uploadfile: 'Upload Banner',
        sort: 'Sort',
        activated: 'Activated',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Promotion',
      },
      view: {
        title: 'View Promotion',
      },
      importer: {
        title: 'Import Promotion',
        fileName: 'promotion_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    trackingParameter: {
      name: 'trackingParameter',
      label: 'All Tracking Parameters',
      menu: 'Tracking Parameters',
      exporterFileName: 'trackingParameter_export',
      list: {
        menu: 'Tracking Parameters',
        title: 'Tracking Parameters',
      },
      create: {
        success: 'Tracking Parameter successfully saved',
      },
      update: {
        success: 'Tracking Parameter successfully saved',
      },
      destroy: {
        success: 'Tracking Parameter successfully deleted',
      },
      destroyAll: {
        success:
          'Tracking Parameter(s) successfully deleted',
      },
      edit: {
        title: 'Edit Tracking Parameter',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        param: 'Parameter',
        value: 'Value',
        example: 'Example',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Tracking Parameter',
      },
      view: {
        title: 'View Tracking Parameter',
      },
      importer: {
        title: 'Import Tracking Parameters',
        fileName: 'trackingParameter_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    openx: {
      name: 'openx banner',
      label: 'Openx Banner',
      menu: 'Openx Banner',
      exporterFileName: 'openx_export',
      list: {
        menu: 'Openx Banner',
        title: 'Openx Banner',
      },
      create: {
        success: 'Openx Banner successfully saved',
      },
      update: {
        success: 'Openx Banner successfully saved',
      },
      destroy: {
        success: 'Openx Banner successfully deleted',
      },
      destroyAll: {
        success: 'Openx Banner(s) successfully deleted',
      },
      edit: {
        title: 'Edit Openx Banner',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        code: 'Code',
        noscript: 'No-Script-Code',
        activated: 'Activated',
        zone: 'Zone',
      },
      enumerators: {
        target: {
          _blank: 'New Window',
        },
        zone: {
          leaderboard: 'Leaderboards',
          menu_left: 'Menu on the left',
          menu_right: 'Menu on the right',
          short_leaderboard: 'Short leaderboards',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Openx Banner',
      },
      view: {
        title: 'View Openx Banner',
      },
      importer: {
        title: 'Import Openx Banner',
        fileName: 'openx_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    generalPage: {
      name: 'general page',
      label: 'All General Pages',
      menu: 'General Pages',
      exporterFileName: 'general_page_export',
      list: {
        menu: 'General Pages',
        title: 'General Pages',
      },
      create: {
        success: 'General Page successfully saved',
      },
      update: {
        success: 'General Page successfully saved',
      },
      destroy: {
        success: 'General Page successfully deleted',
      },
      destroyAll: {
        success: 'General Page(s) successfully deleted',
      },
      edit: {
        title: 'Edit General Page',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        navigation: 'Navigation',
        link: 'Link',
        title: 'Title',
        meta_description: 'Meta Description',
        meta_keywords: 'Meta Keywords',
        created: 'Created on',
        author: 'Author',
        relatedLinks: 'Related Links',
        relatedLink: {
          name: 'Name',
          url: 'Address',
        },
        page_image: 'Upload Teaser Logo',
        page_warning: 'Warning',
        teaser_link: 'Link',
        teaser_title: 'Link title',
        teaser: 'Teasers',
        name: 'Name',
        body: 'Body',
        activated: 'Activated',
        pdf: 'Download PDF',
        metadata: 'Metadata',
        page_content: 'Page Content',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New General Page',
      },
      view: {
        title: 'View General Page',
      },
      importer: {
        title: 'Import General Pages',
        fileName: 'general_page_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    pageWarning: {
      name: 'pageWarning',
      label: 'All Warning Pages',
      menu: 'Warning Pages',
      exporterFileName: 'page_Warning_export',
      list: {
        menu: 'Warning Pages',
        title: 'Warning Pages',
      },
      create: {
        success: 'Warning Page successfully saved',
      },
      update: {
        success: 'Warning Page successfully saved',
      },
      destroy: {
        success: 'Warning Page successfully deleted',
      },
      destroyAll: {
        success: 'Warning Page(s) successfully deleted',
      },
      edit: {
        title: 'Edit Warning Page',
      },
      fields: {
        id: 'Id',
        idRange: 'Id #',
        title: 'Title',
        body: 'body',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Warning Page',
      },
      view: {
        title: 'View Warning Page',
      },
      importer: {
        title: 'Import Warning Pages',
        fileName: 'page_Warning_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },
  },

  auth: {
    tenants: 'Workspaces',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    contactSuccess: `Contact email successfully sent`,
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    manager: {
      label: 'Manager',
      description: 'Manager role access',
    },
    custom: {
      label: 'Custom Role',
      description: 'Custom role access',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      rememberMe: 'Remember me',
    },
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    invite: 'Invite',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Users',
    menu: 'Users',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'Users successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'Invite User(s)',
      titleModal: 'Invite User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  author: {
    menu: 'Authors',
  },

  news: {
    menu: 'News',
  },

  promotion: {
    menu: 'Promotion',
  },

  page: {
    menu: 'Pages',
  },

  tenant: {
    name: 'tenant',
    label: 'Workspaces',
    menu: 'Workspaces',
    list: {
      menu: 'Workspaces',
      title: 'Workspaces',
    },
    create: {
      button: 'Create Workspace',
      success: 'Workspace successfully saved',
    },
    update: {
      success: 'Workspace successfully saved',
    },
    destroy: {
      success: 'Workspace successfully deleted',
    },
    destroyAll: {
      success: 'Workspace(s) successfully deleted',
    },
    edit: {
      title: 'Edit Workspace',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'Workspace Name',
      tenantId: 'Workspace',
      tenantUrl: 'Workspace URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New Workspace',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select Workspace',
    validation: {
      url: 'Your workspace URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  plan: {
    menu: 'Subscriptions',
    title: 'Subscriptions',

    free: {
      label: 'Free',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Growth',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Enterprise',
      price: '50',
      unit: '$',
    },

    pricingPeriod: 'month',
    current: 'Current Subscription',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    tenant: 'Tenant',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      logos: 'Logo',
      backgroundImages: 'Background Images',
      shade: 'Shade',
    },
  },
  dashboard: {
    menu: 'Dashboard',
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
    placeholder: {
      title: 'Click or drag and drop files here',
      size: '(Max {0})',
    },
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint: 'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'No records found',
    loading: 'Loading...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} von {2}',
    labelRowsPerPage: 'Per page:',
  },

  footer: {
    description:
      'CFD sind komplexe Instrumente und gehen wegen der Hebelwirkung mit dem hohen Risiko einher, schnell Geld zu verlieren. Zwischen 74 % und 89 % der Kleinanlegerkonten verlieren beim Handel mit CFD Geld. Sie sollten überlegen, ob Sie verstehen, wie CFD funktionieren und ob Sie es sich leisten können, das hohe Risiko einzugehen, Ihr Geld zu verlieren.Informieren Sie sich vor der Kontoeröffnung bei einem Forex-Broker, CFD-Broker, ECN / STP Broker, Metatrader Broker oder vor dem Kauf eines Expert-Advisors in unserer Datenbanküber Erfahrungen und Bewertungen anderer Trader, lesen Sie die dazugehörigen Erfahrungsberichte und machen Sie einen Forex-Broker Vergleich. Helfen Sie anderen Nutzern beim Vergleich der gelisteten Forex-Broker und teilen Sie ihre bisherigen Erfahrungen auf {0} und schreiben Sie einen Erfahrungsbericht. Das Ranking der Broker basiert auf den abgegebenen Kundenbewertungen.',
  },
};

export default en;
