import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import classnames from 'classnames'

// Material UI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'

// Components
import SliderArrow from '../SliderArrow'
import ClassBox from './classBox'

// Icons
import TimelapseIcon from '@material-ui/icons/Timelapse'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { ReviewRequested } from '../CustomIcons'

// Style
import useStyles from './classesBar.styles'
import { isEmptyArray } from '../../../utils/utils'

function ClassesBar() {
  const classes = useStyles()
  const slider = useRef(null)

  const { schoolClasses, selectedClass } = useSelector(
    (state) => state.schoolClasses
  )

  useEffect(() => {
    const classIndex =
      schoolClasses.findIndex((item) => item.id === selectedClass.id) || 0
    slider.current.slickGoTo(classIndex)
  }, [selectedClass])

  const getTotals = () => {
    let totalReviewRequest = 0
    let totalComments = 0
    let totalOverdue = 0

    for (let i = 0; i < schoolClasses.length; i++) {
      totalReviewRequest += schoolClasses[i].evidences.reviewRequests
      totalComments += schoolClasses[i].evidences.unreadComments
      totalOverdue += schoolClasses[i].evidences.overdue
    }

    return {
      totalReviewRequest,
      totalComments,
      totalOverdue,
    }
  }

  const totals = schoolClasses.length ? getTotals() : 0

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SliderArrow direction="next" />,
    prevArrow: <SliderArrow direction="previous" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Box boxShadow={2} className={classes.container}>
      <Grid container alignItems="center">
        <Grid item xs={12} lg={8}>
          <Box className={classes.classesContainer} px={4} py={2}>
            <Slider ref={slider} {...settings}>
              {schoolClasses &&
                !isEmptyArray(schoolClasses) &&
                schoolClasses.map((item) => {
                  return <ClassBox key={item.id} classInfo={item} />
                })}
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box px={2} py={2}>
            <List dense disablePadding>
              <ListItem dense className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <Tooltip
                    title="Reviews requested"
                    aria-label="reviews requested"
                  >
                    <i>
                      <ReviewRequested
                        className={classnames(classes.icon, 'pomegranate')}
                      />
                    </i>
                  </Tooltip>
                </ListItemIcon>
                <div className="info-container">
                  <strong>Review request:&nbsp;</strong>{' '}
                  {totals && totals.totalReviewRequest}
                </div>
              </ListItem>
              <ListItem dense className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <Tooltip title="Unread comments" aria-label="unread comments">
                    <i>
                      <FeedbackIcon
                        className={classnames(classes.icon, 'persian-green')}
                      />
                    </i>
                  </Tooltip>
                </ListItemIcon>
                <div className="info-container">
                  <strong>Unread comments:&nbsp;</strong>
                  {totals && totals.totalComments}
                </div>
              </ListItem>
              <ListItem dense className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                  <Tooltip title="Overdue" aria-label="overdue">
                    <i>
                      <TimelapseIcon
                        className={classnames(classes.icon, 'pomegranate')}
                      />
                    </i>
                  </Tooltip>
                </ListItemIcon>
                <div className="info-container">
                  <strong>Overdue:&nbsp;</strong>{' '}
                  {totals && totals.totalOverdue}
                </div>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClassesBar
