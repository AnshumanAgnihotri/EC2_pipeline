import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import HeadMetadata from "../shared/HeadMetadata";
import Skeleton from '@material-ui/lab/Skeleton'
import DashboarsStats from "./dashboardStats";
import RecentProject from "./RecentProject"
import RecentComments from "./recentComments";
import DueEvidence from "./dueEvidence";


const Index = () => {
    const dispatch  = useDispatch();
    const selectedTerm = useSelector((state) => state.schoolTerms.selectedTerm)
    useEffect(() => {
         if (selectedTerm) {
          dispatch.dashboard.getDashboarStats({
            termId: selectedTerm.id,
          })
          dispatch.dashboard.getUpcomminDueEvidences({
            termId: selectedTerm.id,
          })
          dispatch.dashboard.getRecentProjects({
            termId: selectedTerm.id,
          })

          dispatch.dashboard.getRecentComments({
            termId: selectedTerm.id,
          })
        }
      }, [selectedTerm])


      const { getDashboarStats, getUpcomminDueEvidences, getRecentProjects, getRecentComments} = useSelector(
        (state) => state.loading.effects.dashboard)

      const dashboardStats = useSelector((state) => state.dashboard.dashboardStats)
      const upcomingDueEvidence = useSelector((state) => state.dashboard.upcomingDueEvidence)
      const recentProjects = useSelector((state) => state.dashboard.recentProjects)
      const recentComments = useSelector((state) => state.dashboard.recentComments)


      if (getDashboarStats || getUpcomminDueEvidences || getRecentProjects || getRecentComments)
      return [...Array(10).keys()].map((item) => (
        <>
        <Skeleton
          key={item}
          height={50}
          style={{ marginBottom: '20px' }}
        />
        </>
      ))

    return (
      <>
      <HeadMetadata metadata={{ title: 'LiFT Learning | Dashboard' }} />
        <div className="container-fluid">
        <div className="dashboard-wrapper">
            <DashboarsStats dashboardStats={dashboardStats}  />
            <div className="row">
              <DueEvidence upcomingDueEvidence={upcomingDueEvidence} />
              <RecentProject recentProjects={recentProjects} />
            </div>
            <RecentComments recentComments = {recentComments} />
        </div>
	    </div>
      </>
  )
}

export default Index;