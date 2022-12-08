import Web3 from 'web3'
// Method to convert wei to eth
export function weiToEth(wei) {
    return Web3.utils.fromWei(`${wei}`, 'ether');
}
