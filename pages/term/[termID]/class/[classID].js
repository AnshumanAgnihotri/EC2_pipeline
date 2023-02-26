import { useSelector, useDispatch } from 'react-redux'

// Material UI
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

// Components
import withAuth from '../../../../hoc/withAuth'
import MainLayout from '../../../../components/layouts/Main'
import HeadMetadata from '../../../../components/shared/HeadMetadata'

function ClassPage() {
  const dispatch = useDispatch()
  

  return (
    <MainLayout>
      <HeadMetadata metadata={{ title: 'Dashboard - LiFT' }} />
    </MainLayout>
  )
}

export default withAuth(ClassPage)
