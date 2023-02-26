import React, { useState } from 'react'
import Loader from '../Loader'

function Iframe({ url, height, width, className }) {
  const [loadingIframe, setLoadingIframe] = useState(true)

  const hideLoadingIframe = () => {
    setLoadingIframe(false)
  }

  return (
    <>
      {loadingIframe ? <Loader /> : null}
      <iframe
        src={url}
        onLoad={hideLoadingIframe}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        height={height}
        width={width}
        className={className}
        target='_top'
      />
    </>
  )
}

export default Iframe
