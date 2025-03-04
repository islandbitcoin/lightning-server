![Logo](https://i.imgur.com/iexBI5J.jpeg)

## About

No more invoicing! **Lightning Server** enables you to receive [Lightning Address](https://lightningaddress.com) payments to an address like you@yourdomain.com. Additionally, you'll get [zap receipts](https://github.com/nostr-protocol/nips/blob/master/57.md) on [Nostr](https://damus.io/), as well as **email** and **push notifications** sent to all your devices whenever you receive a Lightning payment of any kind. Never miss a payment alert!

## Features

- Lightning Address
- Email notifications
- Push notifications
- Nostr zap receipts
- Easy Point of Sale (coming soon!)

## Prerequisites

You'll need a Lightning node running [LND](https://github.com/lightningnetwork/lnd) and your own domain. Need a node? [Voltage](https://voltage.cloud) makes it easy and is a great place to get started! Make sure you have some key pieces of information handy, such as your node's REST and gRPC API endpoints, as well as your invoice macaroon.

## Deploying Lightning Server

If you don't already have a VPS, the easiest way to deploy and host **Lightning Server** is on [DigitalOcean's App Platform](https://www.digitalocean.com/products/app-platform), which will cost approximately $5.00 per month at the time of this writing. If you choose to use [Vercel](https://vercel.com), functionality will be *limited to a working Lightning Address only* - you won't get the benefit of Nostr zap receipts, email notifications, or push notifications. [Heroku](https://www.heroku.com/) is not recommended.

## Lightning Server uses Next.js

**Lightning Server** is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Environment Variables

To run this project, you will need to add the following environment variables:

```env
## REQUIRED VARIABLES #############################################################
DOMAIN=yourdomain.com
REST_HOST=lnd-node-address.com:8080
GRPC_HOST=lnd-node-address.com:10009
INVOICE_MACAROON=myInvoiceMacaroonInHex
# For your push notifications! Install Pushover on your phone, then grab the
# API information from https://pushover.net/api
PUSHOVER_TOKEN=apiToken
PUSHOVER_USER=userKey
# This doesn't need to be your primary email; you can set up a new Gmail account
# specifically for sending notifications. Once you do, create an "app password"
# at https://myaccount.google.com/apppasswords
EMAIL_SENDER=notifier.address@gmail.com
EMAIL_PASSWORD=youCreatedAnAppPassword
# Where the notifications will be sent to
EMAIL_RECIPIENT=my.email@domain.com

## OPTIONAL VARIABLES #############################################################
EMAIL_BCC=someone.else@domain.com
# Set to "true" if you're using private channels to enable LND to automatically
# add route hints to your invoices.
PRIVATE_CHANNELS=true
# This restricts your Lightning Addresses to usernames you define, e.g.
# user1@yourdomain.com, etc. Users are separated by commas.
USERS=user1,user2,user3
# Set CATCH_ALL to "false" if you don't want any arbitrary username to be valid
# e.g. if false, a payment to user4@yourdomain.com will fail.
CATCH_ALL=true
# This is what the sender sees in their wallet when they enter your address.
META=Message to display to sender
# This is a JSON string that will forward users to external Lightning
# addresses, e.g. d@yourdomain.com will get forwarded to me@dplus.plus
FORWARDS={"d":"me@dplus.plus","alby":"dread@getalby.com"}
# If you want even more forwards, you can set USE_MONGO to "true" and add them
# dynamically using MongoDB. See an example at https://dplus.plus/alias
USE_MONGO=false
MONGODB_USER=myMongoUser
MONGODB_PASS=myMongoPassword
MONGODB_URL=myMongoURL
# Any key pair in hex (not npub/nsec) will do; no need to use your primary keys!
# If no keys are provided, zap receipts will use Lightning Server's default keys.
NOSTR_PUBLIC_KEY=anyNostrPublicKeyInHex
NOSTR_PRIVATE_KEY=anyNostrPrivateKeyInHex
```

## Running the Notifier

After you've deployed the project, you'll need to start the [Notifier](https://github.com/dplusplus1024/Lightning-Server/blob/main/app/api/notifier/%5Buser%5D/route.js) service at https://yourdomain.com/api/notifier/run in order for push, email, and Nostr notifications to work.

In the root directory is a [bash script](https://github.com/dplusplus1024/Lightning-Server/blob/main/push) that can be run from the console using `./push` anytime you make changes. It will git add, commit, and push your changes to remote, then auto-run the Notifier. This script assumes you're using DigitalOcean and requires two local environment variables, `DIGITAL_OCEAN_APP_ID` and `DIGITAL_OCEAN_API`. That said, *I feel like I'm missing something, as there's got to be a better way of doing this. Help anyone?*

## Warning

This is experimental software, currently still in beta. Use at your own risk!

## To Do

- Continue refactoring, polishing, and optimizing code and documentation
- Add enhanced error handling
- Add Lightning Point of Sale
- Find a better way to automatically start the [Notifier](https://github.com/dplusplus1024/Lightning-Server/blob/main/app/api/notifier/%5Buser%5D/route.js) service
- Host an online workshop on how to run this server!
