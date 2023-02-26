const  DashboarsStats = ({dashboardStats}) => {
    const data = dashboardStats?.stats
    return (
        <div className="row">
				<div className="col-lg-3">
					<a href="#" className="dashboard-card">
						<h2>{data?.class_count}</h2>
						<p>Classes</p>
						<span className="card-icon icon-classes"><i className="fas fa-graduation-cap"></i></span>
					</a>
				</div>
				<div className="col-lg-3">
					<a href="#" className="dashboard-card">
						<h2>{data?.review_request_count}</h2>
						<p>Revisions Requested</p>
						<span className="card-icon icon-requested"><i className="fas fa-clipboard-check"></i></span>
					</a>
				</div>
				<div className="col-lg-3">
					<a href="#" className="dashboard-card">
						<h2>{data?.overdue_count}</h2>
						<p>Evidence Overdue</p>
						<span className="card-icon icon-overdue"><i className="fas fa-clock"></i></span>
					</a>
				</div>
				<div className="col-lg-3">
					<a href="#" className="dashboard-card">
						<h2>{data?.unread_comment_count}</h2>
						<p>Unread Comments</p>
						<span className="card-icon icon-unread"><i className="fas fa-comments"></i></span>
					</a>
				</div>
			</div>
    )
}

export default DashboarsStats