/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    nextConfig,
    env: {
        API_URL: process.env.API_URL,
        HUB_ADDRESS_MUMBAI: process.env.HUB_ADDRESS_MUMBAI,
        HUB_ADDRESS_MATIC: process.env.HUB_ADDRESS_MATIC,
        RPC_URL_MUMBAI: process.env.RPC_URL_MUMBAI,
        RPC_URL_MATIC: process.env.RPC_URL_MATIC,
        CURRENT_CHAIN_ID: process.env.CURRENT_CHAIN_ID,
        DEPLOYMENT_BLOCK: process.env.DEPLOYMENT_BLOCK,
    },
}
