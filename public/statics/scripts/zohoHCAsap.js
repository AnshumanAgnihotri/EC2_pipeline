/* eslint-disable */
// Zoho ASAP Settings
window.ZohoHCAsapSettings = {
  launcherAdjustments: {
    bottom: '20px',
    left: '-80px',
    right: '0',
    width: '42px',
    height: '42px',
    iconWidth: '35px',
    iconHeight: '35px',
  },
  layoutAdjustments: {
    bottom: '0px',
    left: '0px',
    right: '0px',
    minusWidth: '0px',
    plusWidth: '40px',
    minusHeight: '0px',
    plusHeight: '0px',
    maxZindex: '2147483647',
  },
}

// Zoho ASAP code snippet
window.ZohoHCAsap =
  window.ZohoHCAsap ||
  function (a, b) {
    ZohoHCAsap[a] = b
  }
;(function () {
  const d = document
  const s = d.createElement('script')
  s.type = 'text/javascript'
  s.defer = true
  s.src =
    'https://desk.zoho.com/portal/api/web/inapp/148236000004158003?orgId=633918523'
  d.getElementsByTagName('head')[0].appendChild(s)
})()

// Zoho ASAP init
window.ZohoHCAsapReady = function (o) {
  if (
    ((window.ZohoHCAsap__asyncalls = window.ZohoHCAsap__asyncalls || []),
    window.ZohoHCAsapReadyStatus)
  ) {
    o && window.ZohoHCAsap__asyncalls.push(o)
    for (let a = window.ZohoHCAsap__asyncalls, s = 0; s < a.length; s++) {
      const n = a[s]
      n && n()
    }
    window.ZohoHCAsap__asyncalls = null
  } else o && window.ZohoHCAsap__asyncalls.push(o)
}
