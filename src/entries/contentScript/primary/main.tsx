import '../../enableDevHmr'
import './main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import renderContent from '../renderContent'
import '@atlaskit/css-reset'
import Headers from '~/components/Headers'

console.log('contentScript/primary/main.tsx: loaded')
renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, appRoot => {
  ReactDOM.render(<Headers />, appRoot)
})
