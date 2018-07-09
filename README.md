# BlockTrack

Blockchain based inventory tracking. Because we need to keep track of our iPhone chargers! A quick blockchain app I created for [AlephSummit2018](http://aleph-labs.com/alephsummit18/index.html).

## Getting Started

1. `npm i`
1. `node app.js`
1. Navigate to `https://localhost:3001` for the client app.
1. Current state of the blockchain app is at `https://localhost:3000/state` (Note the port is **3000** not 3001)
1. To create a transaction send a POST to `https://localhost:3000/txs` with the following format:

    ```json
    {
      "item": "iPhone charger",
      "user": "John Doe"
    }
    ```

## Local Development

- `node app.js --dev`

In this mode [lotion](https://lotionjs.com/) will not attempt to connect to any peers and the blockchain will be cleared on every run. This is convenient for development because you get a fresh blockchain on every run and will not screw up the existing chain running on other nodes.

All this app does is:

1. Start with initial **state**:

    ```json
    {}
    ```

1. Accept **transactions** of the form:

    ```json
    {
      "item": "iPhone",
      "user": "John Doe"
    }
    ```

1. Which will **mutate** state into:

    ```json
    {
      "items": {
        "iPhone": "John Doe"
      },
      "users": {
        "John Doe": {
            "iPhone": true
        }
      }
    }
    ```

1. Here's another transaction:

    ```json
    {
      "item": "Macbook",
      "user": "Jane Doe"
    }
    ```

1. Which will **mutate** state into:

    ```json
    {
      "items": {
        "iPhone": "John Doe",
        "Macbook": "Jane Doe"
      },
      "users": {
        "John Doe": {
            "iPhone": true
        },
        "Jane Doe": {
            "Macbook": true
        }
      }
    }
    ```

1. Here's another transaction where *Jane* takes the *iPhone* from *John*:

    ```json
    {
      "item": "iPhone",
      "user": "Jane Doe"
    }
    ```

1. You will end up with the following state:

    ```json
    {
      "items": {
        "iPhone": "Jane Doe",
        "Macbook": "Jane Doe"
      },
      "users": {
        "Jane Doe": {
            "iPhone": true,
            "Macbook": true
        }
      }
    }
    ```

That's it!
