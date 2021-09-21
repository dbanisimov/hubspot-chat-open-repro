## Starting the app

1. `npm ci`
2. (optional) Replace the HubSpot Hub ID in the `.env` file
3. `npm start`

## How to reproduce the issue

1. Navigate to [`http://127.0.0.1:3000/contact`](http://127.0.0.1:3000/contact)
2. Open the chat. Either by clicking on the floating button or clicking the "Open chat" button
3. Navigate away to the main page by following the link "Back to main page"
4. The chat widget should close, there is no chatflow on the `/` URL path.
5. Navigate back to the contact page by following the link "Contact page"
6. The chat floating button should come back up. The chat widget is closed this time.
7. Click on the "Open chat" button. The chat widget stays closed, despite calls to the `.open()` method being sent.