import browser from 'webextension-polyfill'

export default async function renderContent(
  cssPaths: string[] = import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS,
  render: (appRoot: HTMLElement) => void
) {
  const appContainer = document.createElement('div')

  if (!import.meta.hot) {
    cssPaths.forEach((cssPath: string) => {
      const styleEl = document.createElement('link')
      styleEl.setAttribute('rel', 'stylesheet')
      styleEl.setAttribute('href', browser.runtime.getURL(cssPath))
      document.head.appendChild(styleEl)
    })
  }

  document.body.insertAdjacentElement('afterbegin', appContainer)

  render(appContainer)
}
