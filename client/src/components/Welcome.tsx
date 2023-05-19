import React, {useContext} from 'react';

import { AiFillAlipayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from './';
import { shortenAddress } from '../utils/shortenAddress';

const companyCommonStyles = "min-h-[50px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-black";

const Input = ({ placeholder, name, type, value, handleChange}:any) => (
    <input 
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-grey text-white border-none text-sm green-glassmorphism"
    />
)

const Welcome = () => {
    const {connectWallet, currentAccount, formData, setformData, sendTransaction, handleChange} = useContext(TransactionContext);

    const handleSubmit = (e: any) => {
        const {addressTo, amount, keyword, message}:any = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between mf:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-black text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-black font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell easily here.
                    </p>
                    {!currentAccount && (
                        <button type="button" onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-7 bg-[#C0C0C0] p-2 rounded-full cursor-pointer hover:bg-[#85929e]">
                            <p className="text-black text-base font-semibold">
                            connect wallet here
                            </p>
                        </button>
                    )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 grid-color-black">
                        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                            Reliability
                        </div>
                        <div className={companyCommonStyles}>
                            Security
                        </div>
                        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={companyCommonStyles}>
                            Low cost
                        </div>
                        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-grey flex justify-center items-center">
                                <SiEthereum fontSize={21} color="white"/>
                                </div>
                                <BsInfoCircle fontSize={17} color="white" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)};
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                Ethereum
                                </p>
                            </div>                           
                        </div>                        
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center grey-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2 "/>
                        {false ? (
                            <Loader />
                        ) : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-[#C0C0C0] w-full mt-2 border-[1px] p-2 border-[#85929e] rounded-full cursor-pointer">
                            Send now
                            </button>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Welcome;