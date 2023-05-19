// https://eth-sepolia.g.alchemy.com/v2/AstwMibtIT6_atKJ1j02680PQiDxaG45

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    Sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/AstwMibtIT6_atKJ1j02680PQiDxaG45',
      accounts: ['a2729b61aa8d8f4322898f55a2f32f52039cf87ec02ed18f3faedb319c29139d']
    }
  }
}