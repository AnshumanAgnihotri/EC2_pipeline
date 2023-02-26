
import MainLayout from "../../../components/layouts/Main";
import HeadMetadata from "../../../components/shared/HeadMetadata";
import withAuth from "../../../hoc/withAuth";
const combinePortfolio = () => {
    return (
        <MainLayout>
            <HeadMetadata metadata={{ title: 'Combined Portfolios' }} />
        </MainLayout>
    )
}

export default withAuth(combinePortfolio)