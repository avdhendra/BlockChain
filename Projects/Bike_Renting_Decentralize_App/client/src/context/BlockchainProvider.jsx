import React, { useState, useEffect } from "react";
import { abi, address } from "./contract.js";
import { ethers } from "ethers";
import { toast } from "react-toastify";
export const BlockchainContext = React.createContext("");

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState();
  const [renterExists, setRenterExists] = useState();
  const [renter, setRenter] = useState();
  const [renterBalance, setRenterBalance] = useState();
  const [due, setDue] = useState();
  const [duration, setDuration] = useState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  const connect = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const checkifWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");
      const accounts = await provider.send("eth_accounts");
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const getBalance = async () => {
    try {
      const balanceOf = await contract.balanceOf();

      setBalance(ethers.utils.formatEther(balanceOf));
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  const checkRenterExists = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.renterExists(currentAccount);
        setRenterExists(renter);
        if (renter) {
          await getRenter();
        }
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const getRenter = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.renterExists(currentAccount);
        setRenter(renter);
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
    canRent,
    active,
    balance,
    due,
    start,
    end
  ) => {
    try {
      const addRenter = await contract.addRenter(
        walletAddress,
        firstName,
        lastName,
        canRent,
        active,
        balance,
        due,
        start,
        end
      );
      await addRenter.wait();
      console.log(`${firstName} added!`);
      checkRenterExists();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount) {
        const balance = await contract.balanceOf(currentAccount);
        setRenterBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const deposit = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const deposit = await contract.deposit(currentAccount, {
        value: bnbValue,
      });
      await deposit.wait();
      await getRenterBalance();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const getDue = async () => {
    try {
      if (currentAccount) {
        const due = await contract.getDue(currentAccount);
        setDue(ethers.utils.formatEther(due));
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const getTotalDuration = async () => {
    try {
      if (currentAccount) {
        const totalDuration = await contract.getTotalDuration(currentAccount);
        setDuration(Number(totalDuration));
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const makePayment = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const deposit = await contract.makePayment(currentAccount, {
        value: bnbValue,
      });
      await deposit.wait();
      await getRenter();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const checkOut = async () => {
    try {
      const checkOut = await contract.checkOut(currentAccount);
      await checkOut.wait();
      await getRenter();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const checkIn = async () => {
    try {
      const checkIn = await contract.checkOut(currentAccount);
      await checkIn.wait();
      await getRenter();
      await getDue();
      await getTotalDuration();
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  useEffect(() => {
    checkifWalletIsConnected();
    checkRenterExists();
    getRenterBalance();
    getDue();
    getTotalDuration();
  }, [currentAccount]);
  return (
    <BlockchainContext.Provider
      value={{
        connect,
        currentAccount,
        renterExists,
        addRenter,
        renterBalance,
        deposit,
        due,
        duration,
        renter,
        makePayment,
        checkIn,
        checkOut,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
