import SvgIcon from '@material-ui/core/SvgIcon'

function Expand(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M19.31,2H4.69A2.7,2.7,0,0,0,2,4.69V19.31A2.7,2.7,0,0,0,4.69,22H19.31A2.7,2.7,0,0,0,22,19.31V4.69A2.7,2.7,0,0,0,19.31,2Zm-8,16H6V12.67L8,14.72l2.8-2.8,1.27,1.27L9.28,16ZM18,11.33,16,9.28l-2.8,2.8-1.27-1.27L14.72,8,12.67,6H18Z"
      />
    </SvgIcon>
  )
}

export default Expand
