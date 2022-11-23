import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension from '@samrum/vite-plugin-web-extension'
import zipPack from 'vite-plugin-zip-pack'
import { resolve } from 'path'
import { getManifest } from './src/manifest'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const manifestVersion = Number(env.MANIFEST_VERSION)
  const zipEnabled = env.ZIP === 'true'
  const extensionVersion = pkg.version
  const browser = manifestVersion === 3 ? 'chrome' : 'firefox'

  return {
    // I had to add this lines in order to get rid of an error appearing in both packages when building the extension
    // '@atlaskit/emoji' and '@atlaskit/link-provider' which are peer dependencies of '@atlaskit/editor-core'
    // The error was:
    // 'LRUCache' is not exported by node_modules/.pnpm/lru-fast@0.2.2/node_modules/lru-fast/lru.js
    build: {
      rollupOptions: {
        external: ['@atlaskit/emoji', '@atlaskit/link-provider', 'lru-fast']
      }
    },
    // End of code added
    resolve: {
      alias: {
        '~': resolve(__dirname, './src')
      }
    },
    plugins: [
      react({ jsxRuntime: 'classic' }),
      webExtension({
        manifest: getManifest(manifestVersion)
      }),
      zipEnabled &&
        zipPack({
          outDir: 'releases',
          outFileName: `${browser}-release-${extensionVersion}.zip`
        })
    ],
    define: {
      'process.env': {}
    }
  }
})
