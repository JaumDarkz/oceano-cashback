import { createContext, useEffect, useState, useContext } from "react";
import { getUserData } from "@/services/api";
require('dotenv').config();

interface AccountContextProps {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    balance: number;
    setBalance: (balance: number) => void;
    wallet: string;
    setWallet: (wallet: string) => void;
    data: any[];
    setData: (data: any[]) => void;
    orders: any[];
    setOrders: (orders: any[]) => void;
}

export const AccountContext = createContext<AccountContextProps>({
    name: "",
    setName: () => { },
    email: "",
    setEmail: () => { },
    balance: 0,
    setBalance: () => { },
    wallet: "",
    setWallet: () => { },
    data: [],
    setData: () => { },
    orders: [],
    setOrders: () => { },
});

export const AccountProvider = ({ children }: any) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    const fetchData = async () => {

        if (process.env.API_URL === undefined) {
            console.log("Can't Reach API URL");
            return
        }

        await getUserData(process.env.API_URL).then((response) => {
            // console.log(response.data.ewallet)
            setName(response.data.name);
            setEmail(response.data.email);
            setBalance(response.data.balance);
            setWallet(response.data.ewallet);
        });

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AccountContext.Provider
            value={{
                name,
                setName,
                email,
                setEmail,
                balance,
                setBalance,
                wallet,
                setWallet,
                data,
                setData,
                orders,
                setOrders
            }}
        >
            {children}
        </AccountContext.Provider>
    );

}

