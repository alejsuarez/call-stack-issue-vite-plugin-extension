import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension from '@samrum/vite-plugin-web-extension'
import zipPack from 'vite-plugin-zip-pack'
import { resolve } from 'path'
import { getManifest } from './src/manifest'
import pkg from './package.json'
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const manifestVersion = Number(env.MANIFEST_VERSION)
  const zipEnabled = env.ZIP === 'true'
  const extensionVersion = pkg.version
  const browser = manifestVersion === 3 ? 'chrome' : 'firefox'

  return {
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        'lru-fast/lru': 'lru-fast/lru.d.ts',
        'lru-fast': 'lru-fast/lru.d.ts'
      }
    },
    plugins: [
      react({ jsxRuntime: 'classic' }),
      webExtension({
        manifest: getManifest(manifestVersion, mode)
      }),
      zipEnabled &&
        zipPack({
          outDir: 'releases',
          outFileName: `${browser}-release-${extensionVersion}.zip`
        }),
      envCompatible()
    ]
  }
})
