import TestButton from '~/components/Headers/TestButton'
import { DOM_CLASSNAMES, DOM_IDS } from '~/constants'

const Headers = () => {
  return (
    <ul
      id={DOM_IDS.HEADERS}
      className={DOM_CLASSNAMES.COLUMN_HEADERS}
    >
      <TestButton />
    </ul>
  )
}

export default Headers
