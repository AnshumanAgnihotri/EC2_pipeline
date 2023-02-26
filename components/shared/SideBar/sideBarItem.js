import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { isEmptyArray, isEmptyObject } from '../../../utils/utils'

SideBarItem.propTypes = {
  sideBarOpen: PropTypes.bool,
  setSideBarOpen: PropTypes.func,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
}

function SideBarItem(props) {
  const { name, Icon, items = [], setSideBarOpen, sideBarOpen } = props
  const [classOpen, setclassOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const routerTermID = router.query.termID
    ? parseInt(router.query.termID)
    : null
  const routerClassID = router.query.classID
    ? parseInt(router.query.classID)
    : null


  const { schoolTerms, selectedTerm } = useSelector(
    (state) => state.schoolTerms
  )

  const handleChange = (event) => {
    const termId = event.target.value
    dispatch.schoolTerms.setSelectedTerm(termId);
    return router.push(`/term/${termId}/dashboard`)
    const currentPath = router.pathname;
    if (currentPath === '/term/[termID]/class/[classID]') {
      router.push(`/term/${termId}/class/${selectedClass?.id}`);
    } else if (currentPath === '/term/[termID]/evidence') {
      router.push(`/term/${termId}/evidence`);
    } else if (currentPath === '/term/[termID]/dashboard') {
      router.push(`/term/${termId}/dashboard`)
    } else if (currentPath === '/term/[termID]/combine-portfolio') {
      router.push(`/term/${termId}/combine-portfolio`)
    } else {
      router.push('/')
    }
  }

  const { selectedClass, schoolClasses } = useSelector(
    (state) => state.schoolClasses
  )

  const handleClassClick = () => {
    if (selectedClass?.id && selectedClass?.id != undefined) {
      if (router.pathname !== '/' && router.pathname !== '/term/[termID]/class/[classID]') {
        router.push(`/term/${selectedTerm?.id}/class/${selectedClass?.id}`);
        return;
      }
      setclassOpen((prev) => !prev)
    }
  }


  useEffect(() => {
    if (
      (!isEmptyArray(schoolTerms) &&
        isEmptyArray(schoolClasses) &&
        selectedTerm &&
        !isEmptyObject(selectedTerm)) ||
      (selectedTerm && selectedTerm?.id !== routerTermID)
    ) 
    //  if (
    //   (!isEmptyArray(schoolTerms) &&
    //   isEmptyObject(classProjects) &&
    //     selectedTerm &&
    //     !isEmptyObject(selectedTerm)) ||
    //   (selectedTerm && selectedTerm?.id !== routerTermID)
    // )
    {
      // dispatch.dashboard.getClassProjects({termId:selectedTerm?.id});
      dispatch.schoolClasses.getSchoolClasses({
        selectedTermId: selectedTerm?.id,
        routeClassId: routerClassID,
      })
    }
  }, [selectedTerm])

  const [classclicked, setClassClilcked] = useState();

  const handleItemClick = (classId) => {
    dispatch.dashboard.commentAction({status:false,evidence:{}});
    dispatch.dashboard.artifactAction(false);
    dispatch.dashboard.skillLevelAction({isShow:false,name:'',levels:{}})
    const params = { isShow: false, name: '', description: '' }
    dispatch.dashboard.showStepEvidenceDescriptionAction(params)
    if (classId && classId != undefined) {
      dispatch.schoolClasses.setSelectedClass(classId)
      setClassClilcked(classId)
      const path = `/term/${selectedTerm?.id}/class/${classId}`
      router.push(path)
    }
  }
  const handleEvidence = () => {
    const evidencePath = `/term/${selectedTerm?.id}/evidence`;
    router.push(evidencePath);
  }
  const handlePortFolio = () => {
    const portfolioPath = `/term/${selectedTerm?.id}/combine-portfolio`;
    router.push(portfolioPath);
  }

  const handleProjectLibrary = () => {
    const projectLibraryPath = `/term/${selectedTerm?.id}/dashboard`;
    router.push(projectLibraryPath);
  }

  useEffect(() => {
    if (router.pathname === '/term/[termID]/class/[classID]') {
      if (!isEmptyArray(isEmptyArray) && schoolClasses.length > 0) {
        schoolClasses.map((classes, i) => {
          if (i === 0) {
            setclassOpen(true);
            setClassClilcked(classes.id)
          }
        })
      }
    }
  }, [schoolClasses])

  const onClassHandler = (type) => {
    props.func(type)
  }

  return (
    <>
      <div className="logo">
        <a href="#">
          <img src="/images/logo.png" className="img-fluid" alt="" />
        </a>
      </div>
      {selectedTerm && (
        <div className="team-box">
          <select
            className="form-control"
            onChange={handleChange}
            defaultValue={selectedTerm?.id}
          >
            {schoolTerms.map((schoolTerm) => (
              <option key={schoolTerm.id} value={schoolTerm.id}>
                {schoolTerm.name}
                {schoolTerm.status === 'current' && ' (CURRENT)'}
              </option>
            ))}
          </select>
        </div>
      )}

      <div id="accordion" className="scrollBar navBarHeight">
      <div className="card">
          <div className="card-header">
            <a
              className={`card-link collapsed ${router.pathname === '/term/[termID]/dashboard' ? 'active' : ''}`}
              data-toggle="collapse"
            >
              <span className="card-icon">
                <img src="/images/project.png" className="img-fluid" alt="" />
              </span>
              <span className="card-text" onClick={handleProjectLibrary}>Dashboard</span>
            </a>
          </div>
          <div
            id="projectLibrary"
            className="collapse"
            data-parent="#accordion"
          >
            <div className="card-body submenu">
              <ul></ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <a
              className={classOpen ? `card-link collapsed ${router.pathname === '/term/[termID]/class/[classID]' ? 'active' : ''}` : `card-link collapsed ${router.pathname === '/term/[termID]/class/[classID]' ? 'active' : ''}`}
              data-toggle="collapse"
              onClick={handleClassClick}
            >
              <span className="card-icon">
                <img src="/images/class.png" className="img-fluid" alt="" />
              </span>
              <span className="card-text">Classes</span>
            </a>
          </div>
          <div
            id="classes"
            className={classOpen ? 'collapse show' : 'collapse'}
            data-parent="#accordion"
          >
            <div className="card-body">
              <div id="accordion2">
                {schoolClasses &&
                  schoolClasses.map((sclass, i) => {
                    return (
                      <div className="card second-card" key={i}>
                        <div className="card-header">
                          <a
                            className={`card-link ${sclass.id === selectedClass?.id ? 'active' : 'collapsed'
                              }`}
                            data-toggle="collapse"
                            onClick={handleItemClick.bind(this, sclass.id)}
                          >
                            {sclass.name}
                          </a>
                          {/* <div className="tooltip-box">
                            <span><i className="fas fa-info"></i></span>
                            Mastery | On Track
                          </div> */}
                        </div>
                        
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <a
              className={`card-link collapsed ${router.pathname === '/term/[termID]/combine-portfolio' ? 'active' : ''}`}
              data-toggle="collapse"
            >
              <span className="card-icon">
                <img src="/images/project.png" className="img-fluid" alt="" />
              </span>
              <span className="card-text" onClick={handlePortFolio}>Combined Portfolio</span>
            </a>
          </div>
          <div
            id="combine-portfolio"
            className="collapse"
            data-parent="#accordion"
          >
            <div className="card-body submenu">
              <ul></ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <a
              className={`card-link collapsed ${router.pathname === '/term/[termID]/evidence' ? 'active' : ''}`}
              data-toggle="collapse"
            >
              <span className="card-icon">
                <img src="/images/project.png" className="img-fluid" alt="" />
              </span>
              <span className="card-text" onClick={handleEvidence}>Evidence</span>
            </a>
          </div>
          <div
            id="combine-portfolio"
            className="collapse"
            data-parent="#accordion"
          >
            <div className="card-body submenu">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SideBarItem
