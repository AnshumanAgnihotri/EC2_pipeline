// Components
import withAuth from '../hoc/withAuth'
import HeadMetadata from '../components/shared/HeadMetadata'
import MainLayout from '../components/layouts/Main'

function Home() {
  return (
    <MainLayout>
      <HeadMetadata metadata={{ title: 'Dashboard - LiFT' }} />
    </MainLayout>
  )
}

export default withAuth(Home)
