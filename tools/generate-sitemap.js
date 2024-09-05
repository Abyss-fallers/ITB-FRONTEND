import { createWriteStream } from 'fs'
import { SitemapStream } from 'sitemap'
import { Readable } from 'stream'

const links = [
  { url: '/dashboard', changefreq: 'daily', priority: 1.0 },
  { url: '/register', changefreq: 'monthly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.8 },
]

const stream = new SitemapStream({ hostname: 'https://it-birjha.ru' })

const writeStream = createWriteStream('./public/sitemap.xml')
stream.pipe(writeStream)

const readable = new Readable({ objectMode: true })
readable._read = () => {}
links.forEach((link) => readable.push(link))
readable.push(null)

readable
  .pipe(stream)
  .on('end', () => {
    console.log('Sitemap.xml создан успешно!')
  })
  .on('error', (err) => {
    console.error('Ошибка создания sitemap.xml:', err)
  })
