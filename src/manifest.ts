import pkg from '../package.json'

const sharedManifest = {
  content_scripts: [
    {
      js: ['src/entries/contentScript/primary/main.tsx'],
      matches: ['https://*.atlassian.net/*', 'https://*.jira.com/*'],
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

const browserAction = {
  default_icon: 'icons/icon.png',
  default_popup: 'src/entries/popup/index.html'
}

const ManifestV2 = {
  ...sharedManifest,
  browser_action: browserAction,
  permissions: [...sharedManifest.permissions, '*://*/*']
}

const ManifestV3 = {
  ...sharedManifest,
  action: browserAction,
  host_permissions: [...sharedManifest.permissions, '*://*/*']
}

export function getManifest(manifestVersion: number): chrome.runtime.ManifestV2 | chrome.runtime.ManifestV3 {
  const manifest = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version
  }

  if (manifestVersion === 2) {
    return {
      ...manifest,
      ...ManifestV2,
      manifest_version: manifestVersion
    }
  }

  if (manifestVersion === 3) {
    return {
      ...manifest,
      ...ManifestV3,
      manifest_version: manifestVersion
    }
  }

  throw new Error(`Missing manifest definition for manifestVersion ${manifestVersion}`)
}
