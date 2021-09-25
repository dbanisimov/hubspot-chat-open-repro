## Starting the app

1. `npm ci`
2. (optional) Replace the HubSpot Hub ID in the `.env` file
3. `npm start`

## How to reproduce the issue

1. Navigate to [`http://127.0.0.1:3000/`](http://127.0.0.1:3000/)
2. There is no chatflow on this page, the floating button is not shown, as expected.
3. Navigate to the contact page by following the link "Contact page"
4. This page has a chat flow, but the chat floating button doesn't appear. The chat widget remains unloaded despite the call to `.load()` method.