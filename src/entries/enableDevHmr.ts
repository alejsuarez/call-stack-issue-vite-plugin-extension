// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line import/no-absolute-path
import RefreshRuntime from '/@react-refresh'

if (import.meta.hot) {
  RefreshRuntime.injectIntoGlobalHook(window)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => type => type
  window.__vite_plugin_react_preamble_installed__ = true
}
