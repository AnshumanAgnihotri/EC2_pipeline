import withAuth from '../../hoc/withAuth'
import MainLayout from '../../components/layouts/Main'
import HeadMetadata from '../../components/shared/HeadMetadata'

const combinePortfolio = () => {
  return (
    <MainLayout>
      <HeadMetadata metadata={{ title: 'Dashboard - LiFT' }} />
      <h1>Portfolio</h1>
    </MainLayout>
  )
}

export default withAuth(combinePortfolio)
