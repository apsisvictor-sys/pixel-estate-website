// assets/js/i18n.js
// All BG/EN copy for the site. Add keys here, reference with data-i18n="key" in HTML.

export const translations = {
  bg: {
    /* NAV */
    "nav.listings":   "Имоти",
    "nav.market":     "Пазарни данни",
    "nav.sell":       "Продайте с нас",
    "nav.contact":    "Контакти",
    "nav.call":       "Обади се",

    /* HERO */
    "hero.eyebrow":   "Вашият доверен партньор в Sofia",
    "hero.title.1":   "Намерете вашия",
    "hero.title.2":   "дом в София",
    "hero.subtitle":  "Технологии, данни и изкуствен интелект в услуга на вашия личен имотен избор. Всеки клиент заслужава напълно индивидуален подход.",
    "hero.cta.primary":   "Разгледайте имотите",
    "hero.cta.secondary": "Свържете се с нас",

    /* TRUST */
    "trust.label":      "Защо Pixel Estate",
    "trust.title":      "Услуга, изградена около вас",
    "trust.subtitle":   "Не продаваме имоти — изграждаме доверие. Всеки клиент е уникален, всяка сделка е отговорност.",
    "trust.1.title":    "Напълно индивидуален подход",
    "trust.1.text":     "Никакви шаблони. Вслушваме се, анализираме и намираме решения, съобразени единствено с вашите нужди, бюджет и жизнен стил.",
    "trust.2.title":    "Технологии в услуга на хората",
    "trust.2.text":     "Използваме AI анализи и пазарни данни в реално време, за да вземаме по-умни решения — но решенията винаги остават ваши.",
    "trust.3.title":    "Прозрачност от началото до края",
    "trust.3.text":     "Без скрити комисионни, без изненади. Ясни условия, честна комуникация и ангажимент към резултата на всяка стъпка от пътя.",

    /* FEATURED */
    "featured.label":     "Актуални оферти",
    "featured.title":     "Избрани имоти",
    "featured.view-all":  "Всички имоти →",

    /* INQUIRY SECTION */
    "inquiry.label":    "Свържете се с нас",
    "inquiry.title":    "Готови сме да помогнем",
    "inquiry.subtitle": "Оставете вашите данни и брокер ще се свърже с вас до края на работния ден.",
    "form.name":     "Вашето име",
    "form.phone":    "Телефон за връзка",
    "form.message":  "Какво търсите? (незадължително)",
    "form.submit":   "Изпрати запитване",
    "form.success":  "Получихме вашето запитване! Ще се свържем с вас скоро.",

    /* SELL PAGE */
    "sell.label":     "Продайте с нас",
    "sell.title":     "Продайте вашия имот умно",
    "sell.subtitle":  "Пазарен анализ, професионална подготовка и индивидуална стратегия — така постигаме максимална стойност за вашия имот.",
    "sell.step1.title":  "Безплатна оценка",
    "sell.step1.text":   "Анализираме пазара и вашия имот задълбочено — не ви даваме произволна цифра, а обоснована оценка, базирана на реални данни.",
    "sell.step2.title":  "Подготовка и представяне",
    "sell.step2.text":   "Организираме професионална фотосесия, изготвяме привлекателна обява и разпространяваме офертата по всички ключови канали.",
    "sell.step3.title":  "Активна работа с купувачите",
    "sell.step3.text":   "Управляваме огледите, квалифицираме кандидатите и водим преговорите — винаги с вашите интереси на преден план.",
    "sell.step4.title":  "Юридическа сигурност и финализиране",
    "sell.step4.text":   "Координираме целия документален процес, работим с нотариуси и банки, и стоим до вас до финалното подписване.",

    /* CONTACT PAGE */
    "contact.label":    "Контакти",
    "contact.title":    "Свържете се с нас",
    "contact.subtitle": "Нашият екип е на ваше разположение. Напишете ни или се обадете директно.",

    /* MARKET PAGE */
    "market.label":    "Пазарни данни",
    "market.title":    "Пазарът на имоти в София",
    "market.subtitle": "Актуални данни, тенденции и анализи за пазара на недвижими имоти в София. Обновено Q1 2026.",
    "market.toggle.buy":  "Покупка",
    "market.toggle.rent": "Наем",
    "market.insight": "Анализ",
    "market.sources.title": "Източници на данните",
    "market.sources.update": "Последно обновяване: април 2026 \u00b7 Следващо: юли 2026",

    /* BUY TAB */
    "market.buy.avgPrice.label":    "Средна цена/м\u00B2",
    "market.buy.deals.label":       "Сделки Q1 2026",
    "market.buy.deals.source":      "Агенция по вписванията",
    "market.buy.mortgage.label":    "Ипотечен лихвен %",
    "market.buy.mortgage.source":   "БНБ, дек. 2025",
    "market.buy.newBuilds.label":   "Нови жилища (София)",
    "market.buy.newBuilds.source":  "НСИ",
    "market.buy.transactions.title":    "Сделки с имоти в София",
    "market.buy.transactions.subtitle": "Тримесечни данни за вписани сделки и дял на ипотечните покупки",
    "market.buy.transactions.insight":  "Q1 2026 показва спад от 12.3% спрямо година по-рано, но цените остават стабилни. 65% от сделките са с ипотечно финансиране, което сочи за устойчиво търсене от реални купувачи, а не спекулативен капитал. Сезонният спад е типичен за първо тримесечие.",
    "market.buy.priceEvolution.title":    "Ценова динамика 2015 \u2013 2025",
    "market.buy.priceEvolution.subtitle": "Средна цена на квадратен метър в София (EUR)",
    "market.buy.priceEvolution.insight":  "Цените в София са нараснали над 3 пъти за 10 години \u2014 от 715 EUR/м\u00B2 през 2015 до 2,350 EUR/м\u00B2 през 2025. Най-силният ръст е след 2021 г., движен от високата инфлация, исторически ниските лихви, разширяването на ИТ сектора и ограниченото предлагане в централните квартали.",
    "market.buy.priceType.title":    "Средни цени по тип имот",
    "market.buy.priceType.subtitle": "Обща цена и цена на м\u00B2 за апартаменти в София, Q1 2026",
    "market.buy.priceType.insight":  "Цената на м\u00B2 е забележително еднаква (2,660\u20132,712 EUR) независимо от размера на имота. Разликата идва от квадратурата: тристаен апартамент струва средно 312,000 EUR \u2014 2.4 пъти повече от едностаен. За инвеститори: по-малките апартаменти носят по-висока наемна доходност.",
    "market.buy.neighborhoods.title":    "Топ 10 квартали по цена",
    "market.buy.neighborhoods.subtitle": "Средна цена на м\u00B2 (EUR), април 2026",
    "market.buy.neighborhoods.insight":  "Премиум кварталите командват цени 2\u00d7 над средните за София. Докторски паметник води с близо 6,000 EUR/м\u00B2, следван от Изгрев и Южен парк. Центърът не е най-скъпият \u2014 тихите жилищни квартали с паркове и ниско строителство са предпочитани от купувачите с висок бюджет.",
    "market.buy.commentary.title": "Коментар на пазара \u2014 Q1 2026",
    "market.buy.commentary.text":  "Пазарът на имоти в София остава стабилен с устойчив ръст на цените, особено в централните квартали и бизнес зоните. Въпреки спада в броя на сделките с 12% спрямо година по-рано, цените не показват признаци на корекция \u2014 по-скоро отразяват нормализация след рекордната 2025 година. Ипотечните лихви остават исторически ниски (2.9% ГПР), което поддържа достъпността. Секторът на информационните технологии продължава да бъде основен двигател, а новото строителство не успява да задоволи търсенето в предпочитаните квартали.",

    /* RENT TAB */
    "market.rent.oneRoom.label":   "Едностаен наем",
    "market.rent.twoRoom.label":   "Двустаен наем",
    "market.rent.threeRoom.label": "Тристаен наем",
    "market.rent.avg":             "Средно за София",
    "market.rent.neighborhoods.title":    "Наеми по квартал",
    "market.rent.neighborhoods.subtitle": "Средна цена EUR/м\u00B2/месец, април 2026",
    "market.rent.neighborhoods.insight":  "ПЗ Хладилника и Докторски паметник водят с над 11 EUR/м\u00B2/мес., а Център и Лозенец са устойчиво над 10 EUR. За апартамент от 60 м\u00B2 това означава 650\u2013750 EUR/мес. в премиум кварталите. Кръстова вада изненадва с 11.26 EUR \u2014 новото строителство командва по-високи наеми.",
    "market.rent.yield.title":         "Наемна доходност",
    "market.rent.yield.center.label":  "Доходност (център)",
    "market.rent.yield.outside.label": "Доходност (извън център)",
    "market.rent.yield.growth.label":  "Ръст на наемите",
    "market.rent.yield.growth.change": "г/г 2025\u21922026",
    "market.rent.yield.gross":         "Бруто годишна",
    "market.rent.yield.insight":       "Наемната доходност в София е 4\u20135%, което е над средното за столиците в ЕС. Доходността извън центъра е малко по-висока, тъй като наемите падат по-бавно от покупните цени. С ръст на наемите от 5% годишно, инвестицията в имот за отдаване под наем остава привлекателна алтернатива на банковите депозити.",
    "market.rent.commentary.title":    "Коментар за наемния пазар \u2014 Q1 2026",
    "market.rent.commentary.text":     "Наемният пазар в София продължава да расте, подкрепен от ИТ сектора, чуждестранни специалисти и студенти. Търсенето на двустайни апартаменти в кварталите около бизнес парковете (Младост, Мусагеница, Студентски град) остава особено високо. Новото строителство с Smart Home технологии привлича наематели, готови да плащат 10\u201315% повече за модерни жилища. Сезонно очакваме пиково търсене в периода май\u2013септември.",

    /* CTA */
    "market.cta.title":    "Имате въпроси за пазара?",
    "market.cta.subtitle": "Нашите брокери познават всеки квартал. Свържете се за безплатна консултация.",
    "market.cta.button":   "Свържете се с нас",

    /* STATS */
    "stat.1.value": "10+",
    "stat.1.label": "Години опит",
    "stat.2.value": "500+",
    "stat.2.label": "Успешни сделки",
    "stat.3.value": "98%",
    "stat.3.label": "Доволни клиенти",

    /* FOOTER */
    "footer.tagline": "Технологичен подход към личното имотно решение. Sofia, Bulgaria.",
    "footer.nav.title":     "Навигация",
    "footer.services.title": "Услуги",
    "footer.services.buy":   "Купуване",
    "footer.services.sell":  "Продаване",
    "footer.services.rent":  "Наем",
    "footer.services.lease": "Лизинг",
    "footer.contact.title":  "Контакти",
    "footer.copyright":      "© 2026 Пиксел Естейт ЕООД. Всички права запазени.",
    "footer.privacy":        "Поверителност",
    "footer.terms":          "Условия",
    "footer.zmip":           "ЗМИП",
    "footer.address":        "бул. Витоша 72\nСофия 1000",
    "contact.phone.label":   "Телефон",
    "contact.address.label": "Адрес",
    "contact.address":       "бул. Витоша 72\nСофия 1000, България",
    "contact.form.title":    "Изпратете запитване",
  },

  en: {
    /* NAV */
    "nav.listings":   "Properties",
    "nav.market":     "Market Data",
    "nav.sell":       "Sell With Us",
    "nav.contact":    "Contact",
    "nav.call":       "Call us",

    /* HERO */
    "hero.eyebrow":   "Your trusted partner in Sofia",
    "hero.title.1":   "Find your",
    "hero.title.2":   "home in Sofia",
    "hero.subtitle":  "Technology, data and AI working for your personal property journey. Every client deserves a fully tailored, individual approach.",
    "hero.cta.primary":   "Browse Properties",
    "hero.cta.secondary": "Get in Touch",

    /* TRUST */
    "trust.label":      "Why Pixel Estate",
    "trust.title":      "A service built around you",
    "trust.subtitle":   "We don't just sell properties — we build trust. Every client is unique, every transaction is a responsibility.",
    "trust.1.title":    "Fully Individual Approach",
    "trust.1.text":     "No templates. We listen, analyze, and find solutions tailored solely to your needs, budget, and lifestyle.",
    "trust.2.title":    "Technology at Your Service",
    "trust.2.text":     "We leverage AI analysis and real-time market data to make smarter decisions — but the decisions always remain yours.",
    "trust.3.title":    "Transparency End-to-End",
    "trust.3.text":     "No hidden fees, no surprises. Clear terms, honest communication, and commitment to results at every step.",

    /* FEATURED */
    "featured.label":     "Current Listings",
    "featured.title":     "Selected Properties",
    "featured.view-all":  "View all properties →",

    /* INQUIRY SECTION */
    "inquiry.label":    "Get In Touch",
    "inquiry.title":    "We're ready to help",
    "inquiry.subtitle": "Leave your details and a broker will contact you by end of business day.",
    "form.name":     "Your name",
    "form.phone":    "Phone number",
    "form.message":  "What are you looking for? (optional)",
    "form.submit":   "Send Inquiry",
    "form.success":  "We received your inquiry! We'll be in touch shortly.",

    /* SELL PAGE */
    "sell.label":     "Sell With Us",
    "sell.title":     "Sell your property smart",
    "sell.subtitle":  "Market analysis, professional preparation and individual strategy — how we achieve maximum value for your property.",
    "sell.step1.title":  "Free Valuation",
    "sell.step1.text":   "We analyze the market and your property in depth — giving you an evidence-based valuation, not a random number.",
    "sell.step2.title":  "Preparation & Presentation",
    "sell.step2.text":   "We organize professional photography, craft compelling listings, and distribute across all key channels.",
    "sell.step3.title":  "Active Buyer Management",
    "sell.step3.text":   "We manage viewings, qualify buyers, and lead negotiations — always with your interests at the forefront.",
    "sell.step4.title":  "Legal Security & Closing",
    "sell.step4.text":   "We coordinate all documentation, work with notaries and banks, and stand beside you to the final signature.",

    /* CONTACT PAGE */
    "contact.label":    "Contact",
    "contact.title":    "Get in touch",
    "contact.subtitle": "Our team is at your disposal. Write to us or call directly.",

    /* MARKET PAGE */
    "market.label":    "Market Data",
    "market.title":    "Sofia Property Market",
    "market.subtitle": "Up-to-date data, trends and analysis for Sofia's real estate market. Updated Q1 2026.",
    "market.toggle.buy":  "Buy",
    "market.toggle.rent": "Rent",
    "market.insight": "Analysis",
    "market.sources.title": "Data Sources",
    "market.sources.update": "Last updated: April 2026 \u00b7 Next: July 2026",

    /* BUY TAB */
    "market.buy.avgPrice.label":    "Avg. Price/m\u00B2",
    "market.buy.deals.label":       "Deals Q1 2026",
    "market.buy.deals.source":      "Registry Agency",
    "market.buy.mortgage.label":    "Mortgage Rate",
    "market.buy.mortgage.source":   "BNB, Dec 2025",
    "market.buy.newBuilds.label":   "New Dwellings (Sofia)",
    "market.buy.newBuilds.source":  "NSI",
    "market.buy.transactions.title":    "Property Transactions in Sofia",
    "market.buy.transactions.subtitle": "Quarterly registered deals and mortgage share",
    "market.buy.transactions.insight":  "Q1 2026 shows a 12.3% YoY decline in transactions, yet prices remain stable. 65% of deals are mortgage-backed, pointing to sustained demand from real buyers rather than speculative capital. The seasonal dip is typical for Q1.",
    "market.buy.priceEvolution.title":    "Price Trend 2015 \u2013 2025",
    "market.buy.priceEvolution.subtitle": "Average price per square meter in Sofia (EUR)",
    "market.buy.priceEvolution.insight":  "Sofia property prices have more than tripled in 10 years \u2014 from 715 EUR/m\u00B2 in 2015 to 2,350 EUR/m\u00B2 in 2025. The strongest growth came after 2021, driven by high inflation, historically low interest rates, IT sector expansion, and limited new construction in central districts.",
    "market.buy.priceType.title":    "Average Prices by Property Type",
    "market.buy.priceType.subtitle": "Total price and price/m\u00B2 for apartments in Sofia, Q1 2026",
    "market.buy.priceType.insight":  "Price per m\u00B2 is remarkably consistent (2,660\u20132,712 EUR) regardless of apartment size. The difference comes from floor area: a 3-room apartment averages 312,000 EUR \u2014 2.4x more than a 1-room. For investors: smaller apartments yield higher rental returns.",
    "market.buy.neighborhoods.title":    "Top 10 Neighborhoods by Price",
    "market.buy.neighborhoods.subtitle": "Average price per m\u00B2 (EUR), April 2026",
    "market.buy.neighborhoods.insight":  "Premium neighborhoods command prices 2x above the Sofia average. Doktorski Pametnik leads at nearly 6,000 EUR/m\u00B2, followed by Izgrev and Yuzhen Park. The city center is not the most expensive \u2014 quiet residential areas with parks and low-rise buildings are preferred by high-budget buyers.",
    "market.buy.commentary.title": "Market Commentary \u2014 Q1 2026",
    "market.buy.commentary.text":  "Sofia's property market remains stable with steady price growth, especially in central neighborhoods and business districts. Despite a 12% YoY decline in transaction volume, prices show no signs of correction \u2014 rather reflecting normalization after a record 2025. Mortgage rates remain historically low (2.9% APRC), supporting affordability. The IT sector continues to be the primary driver, while new construction fails to meet demand in preferred districts.",

    /* RENT TAB */
    "market.rent.oneRoom.label":   "1-Room Rent",
    "market.rent.twoRoom.label":   "2-Room Rent",
    "market.rent.threeRoom.label": "3-Room Rent",
    "market.rent.avg":             "Sofia Average",
    "market.rent.neighborhoods.title":    "Rent by Neighborhood",
    "market.rent.neighborhoods.subtitle": "Average EUR/m\u00B2/month, April 2026",
    "market.rent.neighborhoods.insight":  "PZ Hladilnika and Doktorski Pametnik lead at over 11 EUR/m\u00B2/month, while Tsentar and Lozenets are steadily above 10 EUR. For a 60 m\u00B2 apartment, this translates to 650\u2013750 EUR/month in premium neighborhoods. Krastova Vada surprises at 11.26 EUR \u2014 new construction commands higher rents.",
    "market.rent.yield.title":         "Rental Yield",
    "market.rent.yield.center.label":  "Yield (City Center)",
    "market.rent.yield.outside.label": "Yield (Outside Center)",
    "market.rent.yield.growth.label":  "Rent Growth",
    "market.rent.yield.growth.change": "YoY 2025\u21922026",
    "market.rent.yield.gross":         "Gross Annual",
    "market.rent.yield.insight":       "Rental yields in Sofia are 4\u20135%, above the average for EU capitals. Yields outside the center are slightly higher as rents decline more slowly than purchase prices. With 5% annual rent growth, buy-to-let investment remains an attractive alternative to bank deposits.",
    "market.rent.commentary.title":    "Rental Market Commentary \u2014 Q1 2026",
    "market.rent.commentary.text":     "Sofia's rental market continues to grow, driven by the IT sector, foreign professionals, and students. Demand for 2-room apartments near business parks (Mladost, Musagenitsa, Studentski Grad) remains particularly high. New construction with Smart Home technology attracts tenants willing to pay 10\u201315% more for modern housing. Seasonally, we expect peak demand during May\u2013September.",

    /* CTA */
    "market.cta.title":    "Questions about the market?",
    "market.cta.subtitle": "Our brokers know every neighborhood. Get in touch for a free consultation.",
    "market.cta.button":   "Get in Touch",

    /* STATS */
    "stat.1.value": "10+",
    "stat.1.label": "Years Experience",
    "stat.2.value": "500+",
    "stat.2.label": "Successful Deals",
    "stat.3.value": "98%",
    "stat.3.label": "Satisfied Clients",

    /* FOOTER */
    "footer.tagline": "A technology-first approach to your personal property journey. Sofia, Bulgaria.",
    "footer.nav.title":     "Navigation",
    "footer.services.title": "Services",
    "footer.services.buy":   "Buying",
    "footer.services.sell":  "Selling",
    "footer.services.rent":  "Rental",
    "footer.services.lease": "Leasing",
    "footer.contact.title":  "Contact",
    "footer.copyright":      "© 2026 Pixel Estate Ltd. All rights reserved.",
    "footer.privacy":        "Privacy",
    "footer.terms":          "Terms",
    "footer.zmip":           "AML",
    "footer.address":        "72 Vitosha Blvd\nSofia 1000",
    "contact.phone.label":   "Phone",
    "contact.address.label": "Address",
    "contact.address":       "72 Vitosha Blvd\nSofia 1000, Bulgaria",
    "contact.form.title":    "Send an inquiry",
  }
};
