import React, { ChangeEvent, useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import 'ethers.utils';

import { contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext(
    { 
        connectWallet: async () => {},
        currentAccount: {},
        formData:{},
        setformData:{},
        handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: any)=>{},
        sendTransaction: async () => {},
        transactions:{}
    }
);

const { ethereum } = window;

window.ethereum;

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionsContract
    });
    transactionsContract.fu
    return transactionsContract;
}


// const createEthereumContract = () => {
//     const provider = new ethers.BrowserProvider(ethereum);
//     const signer = provider.getSigner();
//     const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
//     return transactionsContract;
//   };

export const TransactionProvider = ({ children }: any) => {
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, name: any) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please insatall Metamask first");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0]);

                //getAllTransactions();
            }else{
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please insatall Metamask first");

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const sendTransaction =async () => {
        try {
            if(!ethereum) return alert("Please insatall Metamask first");

            const { addressTo, amount, message, keyword} = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 GWEI
                    value: ethers.toBeHex(parsedAmount),
                }]
            });
            const transactionHash = (await transactionsContract).getFunction("addToBlockChain")(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log('Loading-${transactionHash.hash}');
            await transactionHash.wait();
            console.log('Success-${transactionHash.hash}');

            setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setformData, sendTransaction, handleChange }}>
            {children}
        </TransactionContext.Provider>
    )
};