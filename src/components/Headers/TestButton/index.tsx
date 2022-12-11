import Button from '@atlaskit/button'
import TestEditor from '~/components/Headers/TestButton/TestEditor'
import Popup from '@atlaskit/popup'
import { DOM_CLASSNAMES } from '~/constants'
import { useState } from 'react'

const TestButton = () => {
  const [data, setData] = useState<string>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'pending' | 'resolved'>('idle')

  const handleOpen = async () => {
    if (fetchStatus === 'idle') {
      setIsOpen(!isOpen)
      setFetchStatus('pending')
      setData(data)
      setFetchStatus('resolved')
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleClose = event => {
    const target = event.target as HTMLElement
    const isTargetEditorPopupElement = target.closest('div[data-editor-popup="true"]')
    const isHelperPopupElement = target.ariaLabel === 'Close help dialog'
    if (isTargetEditorPopupElement || isHelperPopupElement) return

    setIsOpen(false)
  }

  return (
    <li
      className={DOM_CLASSNAMES.BUTTON_CONTAINER}
      data-id={1}
    >
      <Popup
        isOpen={isOpen}
        onClose={handleClose}
        placement='bottom-start'
        content={({ update }) => (
          <TestEditor
            data={data}
            setData={setData}
            columnTitle='Test'
            fetchStatus={fetchStatus}
            update={update}
          />
        )}
        trigger={triggerProps => (
          <Button
            {...triggerProps}
            key='1'
            onClick={handleOpen}
            appearance='primary'
          >
            TEST
          </Button>
        )}
      />
    </li>
  )
}

export default TestButton
