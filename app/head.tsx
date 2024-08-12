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
  canonical: 'https://it-birjha.ru/',
}

export const RootHead = () => (
  <>
    <title>{seo.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />
    <meta name="author" content={seo.author} />
    <meta name="geo.region" content={seo.geo} />
    <meta name="category" content={seo.category} />
    <meta name="robots" content={seo.robots} />
    <link rel="canonical" href={seo.canonical} />
    {/* Twitter Card Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content="/twitter-card-image.png" />
    {/* FAVICONS */}
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />
  </>
)

export default RootHead
