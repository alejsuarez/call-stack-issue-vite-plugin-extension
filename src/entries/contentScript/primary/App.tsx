import { EditorContext, Editor, WithEditorActions } from '@atlaskit/editor-core'
import InlineEdit from '@atlaskit/inline-edit'
import { ReactRenderer } from '@atlaskit/renderer'

function App() {
  return (
    <EditorContext>
      <div>
        <InlineEdit
          readViewFitContainerWidth={true}
          defaultValue=''
          editView={() => (
            <WithEditorActions
              render={actions => (
                <div>
                  <Editor
                    shouldFocus={true}
                    appearance={'comment'}
                    minHeight={230}
                    defaultValue=''
                    placeholder='Placeholder'
                    onSave={() => console.log('onSave')}
                    onCancel={() => console.log('onCancel')}
                  />
                </div>
              )}
            />
          )}
          readView={() => (
            <div>
              <span>Add explicit policies...</span>
            </div>
          )}
          onConfirm={() => console.log('onConfirm')}
          hideActionButtons={true}
        />
      </div>
    </EditorContext>
  )
}

export default App
