# BlockTrack

Blockchain based inventory tracking. Because we need to keep track of our iPhone chargers!

## Getting Started

- `npm i`
- Run `node app.js` (set `devMode` to `true` in `app.js` when developing. It trashes the blockchain and starts fresh on each run.)
- Navigate to `https://localhost:3001` for the client app.
- Current state of the blockchain app is at `https://localhost:3000/state` (Note the port is **3000** not 3001)
- To create a transaction send a POST to `https://localhost:3000/txs` with the following format:

    ```json
    {
      "item": "iPhone charger",
      "user": "John Doe"
    }
    ```

