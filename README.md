# GUSD stable coin
GUSD is a stable coin for GATO token
### Installation
```sh
# Clone the repo
    git clone https://gitlab.com/merehead/gato/gato_swap_contracts.git
# Install all dependencies
    npm install
```
### Compile contract
```sh
npx hardhat compile
```
### Test contract
```sh
npx hardhat test
```
### Deploy contract
```sh
npx hardhat run scripts/deploy.js
```
### Deployed Address
```sh
# BSC mainnet

# BSC testnet
    https://testnet.bscscan.com/address/0x427e46f8c93C0F7D9A8E7064Ae3c0A16d9185050
```
### Modifiers
##### onlyOwner
    Executes only by owner
### Functions
##### Mutable
    mint(uint256 amount) - mint the GUSD by owner(onlyOwner)
    burn(uint256 amount) - burn the GUSD 
    transfer(address recipient, uint256 amount) - transfer tokens to user
        recipient - address of receiver
        amount - transfered amount
    transferFrom(address sender, address recipient, uint256 amount) - transfer tokens to user
        Approve must be done before transferFrom.
        sender - address of sender
        recipient - address of receiver
        amount - transfered amount
    approve(address spender, uint256 amount) - approve token for user
        spender - address of spender
        amount - allowed amount
    increaseAllowance(address spender, uint256 addedValue) - increase the allowed amount
        spender - address of spender
        addedValue - added amount
    decreaseAllowance(address spender, uint256 subtractedValue) - decrease the allowed amount
        spender - address of spender
        subtractedValue - added amount
##### View
    getOwner() - returns the address of owner(address)
    name() - returns coin diplay name(string)
    symbol() - returns coin ticker(string)
    decimals() - returns coin decimal(uint8) 
    allowance(address owner, address spender) - returns the allowed amount sent from owner to spender(uint256)
        owner - owner of coin
        spender - address of spender
    totalSupply() - returns the total supply of coin(uint256)
    balanceOf(address account) - returns the balance of user(uint256)

     
    
    
    





