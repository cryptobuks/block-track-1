const lotion = require('lotion')
const peers = require('./peers.js')
const genesis = require.resolve('./genesis.json');

let app = lotion({
    // logTendermint: true,
    devMode: false,
    genesis: genesis,
    lotionPort: 3000,
    p2pPort: 46656,
    tendermintPort: 46657,
    keys: 'priv_validator.json',
    peers: peers,
    initialState: {
        items: {},
        users: {}
    }
})

app.use((state, tx) => {
    // Validation
    if (typeof tx.item === 'string' && typeof tx.user === 'string') {
        // 1. Get previous owner (can be null)
        const prevOwner = state.items[tx.item]
        // 2. Set the new owner
        state.items[tx.item] = state.items[tx.item] || {};
        state.items[tx.item] = tx.user
        // 3. If prev owner is not null, remove item from from him
        if (typeof prevOwner === 'string') {
            state.users[prevOwner][tx.item] = state.users[prevOwner][tx.item] || {}
            delete state.users[prevOwner][tx.item]
        }
        // 4. Add the item to new user 
        state.users[tx.user] = state.users[tx.user] || {}
        state.users[tx.user][tx.item] = state.users[tx.user][tx.item] || {}
        state.users[tx.user][tx.item] = true

        if (prevOwner !== undefined) {
            console.log(`${tx.item} transferred from ${prevOwner} to ${tx.user}`)
        } else {
            console.log(`${tx.user} took first ownership of ${tx.item}`)
        }

        // Prune state
        clearEmpties(state)
    }
})

app.listen(3000).then(genesis => {
    console.log('BlockTrack is tracking!')
    console.log(`GCI: ${genesis.GCI}`)
})

// https://stackoverflow.com/questions/42736031/remove-empty-objects-from-an-object
function clearEmpties(o) {
    for (var k in o) {
        if (!o[k] || typeof o[k] !== "object") {
            continue // If null or not an object, skip to the next iteration
        }

        // The property is an object
        clearEmpties(o[k]); // <-- Make a recursive call on the nested object
        if (Object.keys(o[k]).length === 0) {
            delete o[k]; // The object had no properties, so delete that property
        }
    }
}