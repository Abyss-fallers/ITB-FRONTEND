const seo = {
  title: 'ИТ-биржа: платформа для поиска IT проектов и специалистов',
  description:
    'ИТ-биржа - площадка для поиска проектов и специалистов в области информационных технологий. Зарегистрируйтесь и начните работу с лучшими IT-специалистами России.',
  keywords:
    'ITB, IT фриланс, фриланс-биржа, IT проекты, IT специалисты, разработчики, программисты, веб-дизайнеры, UX/UI, DevOps, удаленная работа, IT вакансии, заказчики, фриланс платформы, проекты IT, ITB фриланс, ITB биржа, ITB проекты, IT фрилансеры, IT рынок труда',
  author: 'ITB',
  geo: 'RU',
  category:
    'Freelance, IT, Technology, Software Development, Web Development, UX/UI Design, IT Services, Remote Work, IT Jobs',
  robots: 'index, follow',
  canonical: 'https://itbrz.ru',
  ogImage: '/og-image.png',
  themeColor: '#007bff',
  language: 'ru',
}

export const RootHead = () => (
  <>
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />
    <meta name="author" content={seo.author} />
    <meta name="geo.region" content={seo.geo} />
    <meta name="category" content={seo.category} />
    <meta name="robots" content={seo.robots} />
    <link rel="canonical" href={seo.canonical} />

    <meta property="og:site_name" content="ITB" />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={seo.canonical} />
    <meta property="og:image" content={seo.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content={seo.language} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content={seo.ogImage} />
    <meta name="theme-color" content={seo.themeColor} />
    <meta httpEquiv="Content-Language" content={seo.language} />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />

    <meta httpEquiv="Content-Security-Policy" content="default-src 'self';" />
    <meta name="rating" content="general" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="format-detection" content="telephone=no" />
  </>
)

export default RootHead
