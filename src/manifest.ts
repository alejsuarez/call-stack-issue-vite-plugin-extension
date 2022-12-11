import pkg from '../package.json'

const getSharedManifest = (mode: string) => {
  const isDevMode = mode === 'development'

  return {
    content_scripts: [
      {
        js: ['src/entries/contentScript/primary/main.tsx'],
        ...(!isDevMode && { css: ['src/entries/contentScript/primary/main.css'] }),
        matches: ['https://*.blank.org/*'],
        run_at: 'document_end',
        all_frames: true
      }
    ],
    icons: {
      16: 'icons/icon.png',
      48: 'icons/icon.png',
      128: 'icons/icon.png'
    },
    permissions: []
  }
}

const browserAction = {
  default_icon: 'icons/icon.png',
  default_popup: 'src/entries/popup/index.html'
}

const ManifestV2 = (mode: string) => {
  const sharedManifest = getSharedManifest(mode)
  return {
    ...sharedManifest,
    browser_action: browserAction,
    permissions: [...sharedManifest.permissions, '*://*/*']
  }
}

const ManifestV3 = (mode: string) => {
  const sharedManifest = getSharedManifest(mode)
  return {
    ...sharedManifest,
    action: browserAction,
    host_permissions: [...sharedManifest.permissions, '*://*/*']
  }
}

export function getManifest(manifestVersion: number, mode: string): chrome.runtime.ManifestV2 | chrome.runtime.ManifestV3 {
  const manifest = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version
  }

  if (manifestVersion === 2) {
    return {
      ...manifest,
      ...ManifestV2(mode),
      manifest_version: manifestVersion
    }
  }

  if (manifestVersion === 3) {
    return {
      ...manifest,
      ...ManifestV3(mode),
      manifest_version: manifestVersion
    }
  }

  throw new Error(`Missing manifest definition for manifestVersion ${manifestVersion}`)
}
