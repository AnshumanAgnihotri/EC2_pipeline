import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'

// Components
import Header from '../../shared/Header'
import Loader from '../../shared/Loader'

// Styles
import useStyles from './main.styles'
import { isEmptyArray, isEmptyObject } from '../../../utils/utils'

function MainLayout({ children }) {
  // console.log('Chileren value', children)
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const routerTermID = router.query.termID
    ? parseInt(router.query.termID)
    : null
  const routerClassID = router.query.classID
    ? parseInt(router.query.classID)
    : null

  const isLoading = useSelector((state) => state.loading.global)
  const sideBarOpen = useSelector((state) => state.app.sideBarOpen)
  const evidencePaneOpen = useSelector((state) => state.app.evidencePaneOpen)
  const teacher = useSelector((state) => state.user)
  const { selectedTerm, schoolTerms } = useSelector(
    (state) => state.schoolTerms
  )
  const { selectedClass, schoolClasses } = useSelector(
    (state) => state.schoolClasses
  )
  const gettingSchoolClasses = true
  // const gettingSchoolClasses = useSelector(
  //   (state) => state.loading.effects.schoolClasses.getSchoolClasses
  // )

  useEffect(() => {
    // Hide Zoho ASAP Help Icon
    window.ZohoHCAsapReady(function () {
      ZohoHCAsap.Action('hideLauncher') // eslint-disable-line
    })

    // Gets user info
    if (isEmptyObject(teacher)) {
      dispatch.user.getUser()
    }

    // Get school terms
    if (isEmptyArray(schoolTerms)) {
      dispatch.schoolTerms.getSchoolTerms({ routeTermId: routerTermID })
    }
  }, [])

  useEffect(() => {
    if (
      (!isEmptyArray(schoolTerms) &&
        isEmptyArray(schoolClasses) &&
        selectedTerm &&
        !isEmptyObject(selectedTerm) &&
        !gettingSchoolClasses) ||
      (selectedTerm && selectedTerm.id !== routerTermID)
    ) {
      // dispatch.schoolClasses.getSchoolClasses({
      //   selectedTermId: selectedTerm.id,
      //   routeClassId: routerClassID,
      // })
    }
  }, [selectedTerm])

  useEffect(() => {
    const path = router.pathname
    if (path === '/' || path === '/term/[termID]/dashboard') {
      if (
        selectedTerm &&
        !isEmptyObject(selectedTerm)
        //  &&
        // selectedClass &&
        // !isEmptyObject(selectedClass)
      ) {
        const newPath = `/term/${selectedTerm.id}/dashboard`
        router.push(newPath)
      }
    }
  }, [selectedTerm])

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <Header />
      <div display="flex">
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: sideBarOpen,
          })}
        >
          <div display="flex" flexdirection="column" height="100%">
            <div
              p={2}
              height={evidencePaneOpen ? '60%' : '100%'}
              overflow="auto"
            >
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
