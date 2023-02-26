// Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function EmptyMessage({ children, ...props }) {
  return (
    <Box {...props} display="flex" alignItems="center">
      <Typography>{children}</Typography>
    </Box>
  )
}

export default EmptyMessage
