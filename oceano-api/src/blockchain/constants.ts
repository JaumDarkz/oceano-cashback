require('dotenv').config();

export const DeepDiveHub = {
    Networks: {
        80001: process.env.HUB_ADDRESS_MUMBAI,
        137: process.env.HUB_ADDRESS_POLYGON
    }
}

export const Sal = {
    Networks: {
        80001: process.env.SAL_ADDRESS_MUMBAI,
        137: process.env.SAL_ADDRESS_POLYGON
    }
}

export const RpcUrl = {
    Networks: {
        80001: process.env.RPC_URL_MUMBAI,
        137: process.env.RPC_URL_POLYGON
    }
}
