
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SideBarItem from '../../../components/shared/SideBar/sideBarItem'

import useStyles from './header.styles'
import ManageAccountModal from '../../modal/ManageAccountModal'

import Auth from '../../../utils/auth'
import AuthLegacy from '../../../utils/authLegacy'
import Dashboard from '../../dashboard'
import EvidenceAll from '../../evidences/evidenceAll'
import CombinePortfolio from '../../cominePortfolio/index'
import ManageAccount from '../../account/manageAccount'
import { isEmptyArray } from '../../../utils/utils'
import DashboardClassPage from '../../classes/index'

function Header({ showTermControls = true }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const path = router.pathname;
  const user = useSelector((state) => state.user)
  const open = useSelector((state) => state.app.sideBarOpen)
  const setOpen = dispatch.app.changeSideBarOpen
  const schoolClasses = useSelector(
    (state) => state.schoolClasses.schoolClasses
  )
  const [manageAccountModalOpen,setManageAccountModalOpen] = useState(false);


  const signOut = () => {
    router.push('/login')
    Auth.deauthenticateUser()
    AuthLegacy.deauthenticateUser()
    dispatch({ type: 'RESET_APP' })
  }
  // const setDrawerClosed = () => {
  //   setOpen(false)
  // }
  const setDrawerOpen = () => {
    return !open && setOpen(true)
  }
  // const googleapi = new GoogleApi()
  const [navbarOpen, setNavbarOpen] = useState(true)
  function ssoGoogleLogin() {
    // googleapi.getServiceAccountKey((accessToken, expiry) => {
    const stateID = Auth.generateRandomNo(64)
    const baseurl = process.env.NEXT_PUBLIC_CLIENT_APP_URL
    const clientid = process.env.NEXT_PUBLIC_EDLINK_CLIENTID
    const redirecturi = baseurl + 'auth/callback'

    const edlinkurl = process.env.NEXT_PUBLIC_EDLINK_LOGIN

    const url = `${edlinkurl}?client_id=${clientid}&redirect_uri=${redirecturi}&state=${stateID}&response_type=code`
    window.location = url
    //  })
  }


  const handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }
  const userName  = user?.name? user?.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '):'';

  const [openAccount, setOpenAccount] = useState(false)
  const showHideAccount = () => {
    setOpenAccount(!openAccount)
  }
  const [evidencevalue, setEvidence] = useState('project')
  const pulldata = (data) => {
    setEvidence(data)
    // console.log('Return value :', data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }

  const manageAccountHandler = () => {
     router.push('/account/manage_account')
  }

  const closeIframeHandler = () => {
    setManageAccountModalOpen(false);
    setChangeRoleModalOpen(false);
    
  }



  const handleHelpBar = () => {
    // Zoho ASAP Help widget - open the help pane
    window.ZohoHCAsapReady(function () {
      ZohoHCAsap.Action('open') // eslint-disable-line
    })
  }
  
  return (
    <>
       <div
          className={
            navbarOpen ? 'navbar-wrapper' : 'navbar-wrapper sidemenu-closed'
          }
        >
          <SideBarItem
            name={'Classes'}
            items={schoolClasses}
            setSideBarOpen={setDrawerOpen}
            sideBarOpen={open}
            func={pulldata}
            type={evidencevalue}
          />
        </div>
        <section
          className={
            navbarOpen ? 'main-wrapper' : 'main-wrapper full-wrapper-content'
          }
        >
          <header>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7 d-flex justify-content-start align-items-center">
                  <span className="navIcon" onClick={handleToggle}>
                    <i className="fas fa-bars"></i>
                  </span>

                  <div className="breadcrumb-wrap">
                    <div aria-label="breadcrumb">
                      <ol className="breadcrumb">
                      {path === '/term/[termID]/dashboard' &&  <li
                          className="breadcrumb-item"
                          aria-current="page"
                        >  Dashboard
                        </li>
                        }
                        {path === '/term/[termID]/class/[classID]' &&  
                        <><li
                          className="breadcrumb-item"
                          aria-current="page"
                        >  Classes
                        </li>
                        <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >Projects</li></>
                        }

                        {path === '/term/[termID]/combine-portfolio' && 
                         <li
                          className="breadcrumb-item"
                          aria-current="page"
                        >  COMBINED PORTFOLIO
                        </li>
                        }
                        {path === '/account/manage_account' && <li className="breadcrumb-item active" aria-current="page">Account Management</li>}
                       
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="login-wrap">
                    <ul>
                     
                      <li onClick={showHideAccount}>
                        <div className="account">
                        <span className="userIcon">{userName ? userName.match(/[A-Z]/g).join(''):""}</span>
                          <h2>{userName}</h2>
                          {/* <small>{user.roles}</small> */}
                        </div>
                        <div
                          className="account-info"
                          style={{ display: openAccount ? 'block' : 'none' }}
                        >
                          <ul>
                            <li>
                              <a href="#" onClick={manageAccountHandler}>
                                <span className="material-icons">
                                  person_outline
                                </span>
                                Manage Account
                              </a>
                            </li>
                            <li
                              className="cursor-pointer"
                              onClick={ssoGoogleLogin}
                            >
                              <a href="#">
                                <span className="material-icons">logout</span>
                                Single-Sign on
                              </a>
                            </li>
                            
                          </ul>
                        </div>
                      </li>
                      <li onClick={handleHelpBar}><span className="material-icons helpIcon" >question_mark</span></li>
                      <li>
                        <div>
                          <div
                            onClick={signOut}
                            className="logout cursor-pointer"
                          >
                            <span className="material-icons">logout</span>
                            Logout
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {path === '/account/manage_account' && <ManageAccount />}
          {path === '/term/[termID]/dashboard' && <Dashboard  />}
          {path === '/term/[termID]/class/[classID]' && <DashboardClassPage  />}  
          {path === '/term/[termID]/combine-portfolio' && <CombinePortfolio  />}  
          {path === '/term/[termID]/evidence' && <EvidenceAll  />}  
        </section>
        {manageAccountModalOpen && <ManageAccountModal
                modalOpened={manageAccountModalOpen}
                handleCloseModal={closeIframeHandler}

          />}
      {/* </Drawer> */}
    </>  
  )
}

export default Header
