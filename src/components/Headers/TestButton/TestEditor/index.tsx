import InlineEdit from '@atlaskit/inline-edit'
import { DOM_CLASSNAMES } from '~/constants'
import { EditorContext, Editor, WithEditorActions, EditorActions } from '@atlaskit/editor-core'
import { ReactRenderer } from '@atlaskit/renderer'
import { SkeletonItem } from '@atlaskit/menu'
import { useCallback, useState } from 'react'

interface Props {
  data: string
  setData: (data: string) => void
  columnTitle: string
  fetchStatus: 'idle' | 'pending' | 'resolved'
  update: () => void
}

const TestEditor = ({ data, setData, columnTitle, fetchStatus, update }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const placeHolder = 'Add data...'

  const setIsEditorOpen = useCallback(
    (isOpen: boolean): void => {
      setIsEditing(isOpen)
      update()
    },
    [setIsEditing, update]
  )

  const handleSave = async (actions: EditorActions<any>) => {
    const document = await actions.getValue()

    if (document.content.length) {
      setData(document)
    } else {
      setData(null)
    }

    setIsEditorOpen(false)
  }

  return (
    <div className={DOM_CLASSNAMES.EDITOR}>
      <h5>{columnTitle}</h5>
      <InlineEdit
        readViewFitContainerWidth={true}
        keepEditViewOpenOnBlur={true}
        defaultValue=''
        editView={() => (
          <EditorContext>
            <WithEditorActions
              render={actions => (
                <div className={DOM_CLASSNAMES.EDITOR_EDIT_VIEW}>
                  <Editor
                    allowBreakout
                    allowDate
                    allowExpand={{
                      allowInteractiveExpand: true,
                      allowInsertion: true
                    }}
                    allowLayouts
                    allowPanel
                    allowRule
                    allowStatus
                    allowTables
                    allowTasksAndDecisions
                    allowTextAlignment
                    allowTextColor
                    allowUndoRedoButtons
                    appearance={'comment'}
                    defaultValue={data}
                    elementBrowser={{
                      showModal: true,
                      replacePlusMenu: true
                    }}
                    minHeight={230}
                    onCancel={() => setIsEditorOpen(false)}
                    onChange={null}
                    onSave={() => handleSave(actions)}
                    placeholder='Pro tip: Type / to add tables, code blocks, and more.'
                    placeholderBracketHint="Did you mean to use '/' to insert content?"
                    popupsMountPoint={document.body}
                    quickInsert
                    shouldFocus
                    useStickyToolbar
                  />
                </div>
              )}
            />
          </EditorContext>
        )}
        readView={() => (
          <div className={DOM_CLASSNAMES.EDITOR_READ_VIEW}>
            {fetchStatus === 'pending' ? (
              <div className={DOM_CLASSNAMES.EDITOR_READ_VIEW_SKELETON}>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem isShimmering={true} />
              </div>
            ) : data ? (
              <ReactRenderer document={data} />
            ) : (
              <span style={{ color: '#5e6c84' }}>{placeHolder}</span>
            )}
          </div>
        )}
        isEditing={isEditing}
        onEdit={() => setIsEditorOpen(true)}
        onConfirm={() => setIsEditorOpen(false)}
        hideActionButtons={true}
      />
    </div>
  )
}

export default TestEditor
