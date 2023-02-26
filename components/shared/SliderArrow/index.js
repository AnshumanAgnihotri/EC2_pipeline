import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

function SliderArrow(props) {
  const { className, style, direction, onClick } = props

  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      {direction === 'next' ? (
        <NavigateNextIcon color="primary" fontSize="large" />
      ) : (
        <NavigateBeforeIcon color="primary" fontSize="large" />
      )}
    </div>
  )
}

export default SliderArrow
