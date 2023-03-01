### App

- [thenftnexus.app](https://thenftnexus.app/)
Based on [Elven Tools Dapp](https://www.elven.tools/docs/minter-dapp-introduction.html).

The Dapp is built using Nextjs, Chakra UI, @elrondnetwork libary and a couple of helpful tools.


### How to start it locally:

1. clone or download the repo
2. `cd the-nft-nexus`
3. `yarn install`
4. configure .env.local 
5. `yarn dev` -> for development
6. `yarn build` -> `yarn start` for production



### View Folder

This folder contain all main file of every page.

### Config Folder

This folder contain theme custumization for chakra-ui, elrond networks vars for mainnet, devnet and testnet and constants for SEO.

### Page Folder

Only contain the page entry point of every nextjs page

### Public Folder

Besides contain staics and medias contain the abi (is fetched with axios)

### Shared Folder

This fold acts as a folde for all comuns files in the whole dapp, contain the assets, components, hooks, etc



### Smart contract queries

scQuery is use to query the smart contract just need to pass a context in the example bellow is "NftStakingPoolsWsp" (this to referenciate the smart contract in case that there are others), the function name "hasReadWarning" and later the paramenters

```jsx
const res = await scQuery("NftStakingPoolsWsp", "hasReadWarning", [
    new AddressValue(new Address(address)),
  ]);

const { firstValue } = res;

const data = firstValue.valueOf();
```
### Smart contract transactions
There is some function to make it easy to call tx like : ESDTNFTTransfer, ESDTTransfer, scCall, EGLDPayment. The most comun used one is scCall to inmediatly make a call to the sc

```jsx
scCall("NftStakingPoolsWsp", "allowTokenAsReward", [
  BytesValue.fromUTF8(values.token),
]);
```

### Working with the API

The API endpoint is proxied on the backend side. The only public API endpoint is `/api/elrond`. This is useful when you don't want to show the API endpoint because, for example, you use the paid ones. Also, there is an option to block the `/api/elrond` endpoint to be used only within the Dapp, even previewing it in the browser won't be possible.

You can use `API_ALLOWED_DAPP_HOST` in the .env file to enable `/api/elrond` restrictions. If you don't want to restrict it, you can remove that variable.

In the `middleware.ts`, you'll find the logic for the API restrictions. And in the `next.config.js`, you'll find the configuration for rewrites of the API.

In this demo, the Dapp uses a public API endpoint, so it isn't essential, but it is beneficial when you need to use paid 3rd party service.

Read more about it here: https://www.elven.tools/docs/dapp-api-proxy.html

### Working with the .env and config files

Here are all variables:

```bash
# =============================================
# Public variables (exposed on the frontend)
# =============================================

# Elrond chain (can be devnet, testnet, mainnet)
NEXT_PUBLIC_ELROND_CHAIN = mainnet

# This is the masked/proxied public API endpoint
# only current instance of the Dapp can use it if only API_ALLOWED_DAPP_HOST is set
NEXT_PUBLIC_ELROND_API = /api/elrond

# This is basically the main domain of your dapp
NEXT_PUBLIC_DAPP_HOST = http://localhost:3000

#  Only allow admin to go to admin pages
NEXT_PUBLIC_IS_ADMIN = true


#  Only allow nft creator to go to nft creator pages
NEXT_PUBLIC_IS_CREATOR = true

#  Connected address
NEXT_PUBLIC_ADDRESS = erd15pdm6ag9pfye0vjxtlkwuyqmdndrpc47luu54ljqtp7fhtzxff7qx824m5

# =============================================
# Private variables (used on backend)
# =============================================

# Your main Elrond API can be a custom one. There won't be a possibility
# to reveal this endpoint, it will be masked by NEXT_PUBLIC_ELROND_API
ELROND_CUSTOM_API = https://api.elrond.com

# Only this host will be allowed to consume the API (optional)
# It will work only inside the Dapp, no one will be able to use the endpoint, even in browser
# When removed the API will be available for testing through browser, Postman etc.
API_ALLOWED_DAPP_HOST = http://localhost:3000
```


All variables which start with `NEXT_PUBLIC_` will be readable on the frontend side of the dapp. So please don't use them for any secret keys and data. If you need something to be available only on the backend side, don't use the `NEXT_PUBLIC_` prefix.

You can set up the chain type here. Use `NEXT_PUBLIC_ELROND_CHAIN` to set devnet, testnet or mainnet.

Each hosting provider will have a different way of doing that. We will take a look at how Netlify is doing that below.

