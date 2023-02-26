const TopHeader = () => {
    return (
        <div class="top-wrap pb-3 pt-3">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-3">
					<h2>Combined Portfolios</h2>
					<div class="filter-wrap mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="fas fa-search"></i></span>
							</div>
							<input type="text" class="form-control" placeholder="Search " />
						</div>
					</div>
				</div>
				<div class="col-lg-9">
					<div class="row">
						<div class="col-lg-3 pr-0">
							<div class="checkbox-group">
								<label>Requirements </label>
								<div class="checkBox">
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck11" name="example1" />
										<label class="custom-control-label" for="customCheck11">Show grad requirement only </label>
									</div>
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck12" name="example1" />
										<label class="custom-control-label" for="customCheck12">Show not required for grad only Activity</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 pr-0">
							<div class="checkbox-group">
								<label>Activity </label>
								<div class="checkBox">
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck113" name="example2" />
										<label class="custom-control-label" for="customCheck113">Show assigned only</label>
									</div>
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck123" name="example2" />
										<label class="custom-control-label" for="customCheck123">Show unassigned only Completion</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 pr-0">
							<div class="checkbox-group">
								<label>Completion </label>
								<div class="checkBox">
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck111" name="example3" />
										<label class="custom-control-label" for="customCheck111">Show approved skills only</label>
									</div>
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" id="customCheck112" name="example3" />
										<label class="custom-control-label" for="customCheck112">Show not approved skills only</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3">
							<div class="button-group mt-4">
								<button type="button" class="btn btn-custom">Clear</button>
								{/* <button type="button" class="btn btn-custom">Expand All</button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

export default TopHeader