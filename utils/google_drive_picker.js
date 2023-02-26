'use strict'
import { $, gapi, google } from './common/js/jquery.js'

$(function () {
  // Save who triggers the drive resource
  let targetBtn

  $(document.body).on('click', '.resource-actions .btn-view', function (e) {
    e.preventDefault()
    targetBtn = e.target
    loadPicker()
  })

  // The Browser API key obtained from the Google API Console.
  // Replace with your own Browser API key, or your own key.
  const developerKey = process.env.GOOGLE_BROWSER_API_KEY

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  const clientId = process.env.GOOGLE_BROWSER_CLIENT_ID

  // Replace with your own project number from console.developers.google.com.
  // See "Project number" under "IAM & Admin" > "Settings"
  const appId = process.env.GOOGLE_BROWSER_APP_ID

  // Scope to use to access user's Drive items.
  const scope = ['https://www.googleapis.com/auth/drive.file']
  // var scope = ['https://www.googleapis.com/auth/drive'];

  let pickerApiLoaded = false
  let oauthToken

  // Use the Google API Loader script to load the google.picker script.
  function loadPicker() {
    gapi.load('auth', {
      callback: onAuthApiLoad,
    })

    gapi.load('picker', {
      callback: onPickerApiLoad,
    })
  }

  function onAuthApiLoad() {
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope: scope,
        immediate: false,
      },
      handleAuthResult
    )
  }

  function onPickerApiLoad() {
    pickerApiLoaded = true
    createPicker()
  }

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token
      createPicker()
    }
  }

  // Create and render a Picker object for searching images.
  let picker = null
  function createPicker() {
    if (pickerApiLoaded && oauthToken && picker === null) {
      const view = new google.picker.View(google.picker.ViewId.DOCS)

      // The following line is to allow to open the Google document selection modal in the new teacher UI
      let origin = window.location.protocol + '//' + window.location.host
      origin = window.location.ancestorOrigins[0]

      // view.setMimeTypes("image/png,image/jpeg,image/jpg");
      picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .disableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setOrigin(origin)
        .setCallback(pickerCallback)
        .setSelectableMimeTypes(
          'application/vnd.google-apps.document',
          'application/vnd.google-apps.spreadsheet',
          'application/vnd.google-apps.presentation'
        )
        .build()
      picker.setVisible(true)
    } else if (pickerApiLoaded && oauthToken && picker !== null) {
      picker.setVisible(true)
    }
  }

  // A simple callback implementation.
  function pickerCallback(data) {
    if (data.action === google.picker.Action.PICKED) {
      const fileId = data.docs[0].id
      addResourceChip(data.docs[0])
      $(targetBtn).addClass('disabled')

      // gapi.client.load('drive', 'v3', function () {});
      const permission = {
        type: 'user',
        role: 'writer',
        emailAddress: process.env.GOOGLE_CLIENT_EMAIL,
      }

      const request = gapi.client.request({
        path: '/drive/v3/files/' + fileId + '/permissions?alt=json',
        method: 'POST',
        body: permission,
        headers: { 'content-type': 'application/json' },
      })

      request.execute(function (resp) {
        console.info('permission granted.')
      })
    }
  }

  function addResourceChip(document) {
    const $container = $(targetBtn)
      .closest('.resources')
      .siblings('.resource-container')
    const docId = document.id
    const title = document.name
    const iconUrl = document.iconUrl
    const url = document.url
    const chipHtml = `
        <div class="resource template"
          data-title="${title}" data-document-id="${docId}" data-url="${url}" data-icon-url="${iconUrl}">
          <img src="${iconUrl}">
          <div class="title">${title}</div>
          <div class="actions">
            <a class="" target="_blank" href="${url}">
              <i class="material-icons launch ">launch</i>
            </a>
            <a class="delete-resource " href="#">
              <i class="material-icons delete_outline ">delete_outline</i>
            </a>
          </div>
        </div>`
    $container.prepend(chipHtml)
  }
})
