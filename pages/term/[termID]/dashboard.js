
import MainLayout from "../../../components/layouts/Main";
import HeadMetadata from "../../../components/shared/HeadMetadata";
import withAuth from "../../../hoc/withAuth";
const Dashboard = () => {
    return (
            <MainLayout>
                <HeadMetadata metadata={{ title: 'Dashboard - Dashboard' }} />
            </MainLayout>
    )
}

export default withAuth(Dashboard)