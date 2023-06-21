# TagToken

## Requirements

- NodeJS
- Yarn

### Installation

- install prereq packages

```shell
yarn install
```

- update `RPC_PROVIDER` value in `.env`
- update `CONTRACT_ADDRESS` value in `.env`

## Start the App

```shell
yarn dev
```


## Requests
- the postman collection is saved in `api/data` or you can use the request below

```
POST http://localhost:3001/transfer
BODY
{
  "from": 0,                                           // index of the main owner, MAIN_OWNERS in api/lib/transfer-from.js line 8
  "to": "0x59ff9EcfC0999b3d7Ce20e2097a29E021a64C9fB",  // address of the recipient
  "amount": 8                                          // amount of tag token to be transferred
}

```
