import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { missingSearchPage, publicOrigin, searchPages } from '../src/data/search'

const entities: Record<string, string> = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' }
const escape = (value: string) => value.replace(/[&"<>]/g, (character) => entities[character] ?? character)

export function searchOutput(siteUrl: string | undefined): Plugin {
  const origin = publicOrigin(siteUrl)
  let directory: string

  return {
    name: 'woodrig-search-output',
    apply: 'build',
    configResolved(config) {
      directory = resolve(config.root, config.build.outDir)
    },
    async writeBundle() {
      const shell = await readFile(resolve(directory, 'index.html'), 'utf8')
      const pages = { ...searchPages, '/404': missingSearchPage }

      for (const [path, metadata] of Object.entries(pages)) {
        const target = resolve(directory, path === '/' ? 'index.html' : path.slice(1) + '.html')
        const canonical = origin && !metadata.noindex ? origin + path : ''
        const image = origin ? new URL(metadata.image, origin).href : metadata.image
        const html = shell
          .replace(/<title>[^<]*<\/title>/, () => `<title>${escape(metadata.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, (_, tag) => tag + escape(metadata.description))
          .replace(/(<meta name="robots" content=")[^"]*/, (_, tag) => tag + (metadata.noindex ? 'noindex, follow' : 'index, follow'))
          .replace(/(<meta property="og:title" content=")[^"]*/, (_, tag) => tag + escape(metadata.title))
          .replace(/(<meta property="og:description" content=")[^"]*/, (_, tag) => tag + escape(metadata.description))
          .replace(/(<meta property="og:image" content=")[^"]*/, (_, tag) => tag + escape(image))
          .replace('<link rel="canonical" />', () => canonical ? `<link rel="canonical" href="${escape(canonical)}" />` : '')
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, html)
      }

      if (origin) {
        const entries = Object.entries(searchPages)
          .filter(([, metadata]) => !metadata.noindex)
          .map(([path]) => `  <url><loc>${escape(origin + path)}</loc></url>`)
        await writeFile(resolve(directory, 'sitemap.xml'), [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', '',
        ].join('\n'))
        await writeFile(resolve(directory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
      }
    },
  }
}
