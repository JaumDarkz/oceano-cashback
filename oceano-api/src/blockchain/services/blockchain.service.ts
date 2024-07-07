require ('dotenv').config();
import { ethers } from "ethers";
import { Injectable , BadRequestException } from "@nestjs/common";
import { DeepDiveHub as HubAddress, Sal as SalAddress, RpcUrl } from "../constants";
import { abi as HubAbi } from "../abis/DeepDiveHub.json";
import { abi as SalAbi} from "../abis/Sal.json";

@Injectable()
export class BlockchainService {

    async tryTransaction (transaction, attempts) {
        for (let i = 0; i < attempts; i++) {
            try {
                var tx = await transaction();
                let receipt = await tx.wait();
                if (receipt.status !== 1)
                    throw new Error(`Transaction failed with error status ${receipt.status}`);
                return receipt;
            } catch (err) {
                if (i === attempts - 1) throw err;
            }
        }
    }

    async initializeOpetator() {

        const chaindId = parseInt(process.env.CURRENT_CHAIN_ID);
        const provider = new ethers.providers.JsonRpcProvider(RpcUrl["Networks"][chaindId]);

        if(!provider) {
            throw new BadRequestException("Unable to initialize operator provider");
        }
                
        const privateKey = process.env.MASTER_PRIVATE_KEY;
        const wallet = new ethers.Wallet(privateKey, provider);

        if(!wallet) {
            throw new BadRequestException("Unable to initialize operator wallet");
        }

        const BalanceHub = new ethers.Contract(HubAddress["Networks"][chaindId], HubAbi, provider);
        const Sal = new ethers.Contract(SalAddress["Networks"][chaindId], SalAbi, provider);

        return {
            wallet,
            BalanceHub,
            Sal
        }
    }

    async approveSal (wallet, Sal, amount) {
        const chaindId = parseInt(process.env.CURRENT_CHAIN_ID);
        try{
            await this.tryTransaction(() =>
                Sal
                    .connect(wallet)
                    .approve(HubAddress["Networks"][chaindId], ethers.utils.parseEther(amount.toString()), { gasPrice: process.env.BASE_GAS_PRICE, gasLimit: process.env.BASE_GAS_LIMIT }),
            2);
        } catch (err) {
            throw new BadRequestException("Unable to approve Sal" + err);
        }
    }

    async addBalanceToHub (wallet, BalanceHub, Sal, amount, grantee) {

        await this.approveSal(wallet, Sal, amount);

        try{
            await this.tryTransaction(() =>
                BalanceHub
                    .connect(wallet)
                    .deposit(ethers.utils.parseEther(amount.toString()), grantee, { gasPrice: process.env.BASE_GAS_PRICE, gasLimit: process.env.BASE_GAS_LIMIT }),
            2);
        } catch (err) {
            throw new BadRequestException("Unable to add balance to hub");
        }
    }

    async withdrawFromHub (wallet, BalanceHub, amount, grantee) {

        try{
            await this.tryTransaction(() =>
                BalanceHub
                    .connect(wallet)
                    .withdrawToAdmin(ethers.utils.parseEther(amount.toString()), grantee, { gasPrice: process.env.BASE_GAS_PRICE, gasLimit: process.env.BASE_GAS_LIMIT }),
            2);
        } catch (err) {
            throw new BadRequestException("Unable to withdraw from hub");
        }

    }

}