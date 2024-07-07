import { ethers } from "ethers"
import Artifacts from "@/services/DeepDiveHub.json"

export async function getPointsHistory(address: string, rpcEndpoint: string, hubAddress: string, deploymentBlock: number) {

  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const contract = new ethers.Contract(hubAddress, Artifacts.abi, provider);
  const filter = await contract.filters.Deposit(address, null);
  const deposits = await contract.queryFilter(filter, deploymentBlock, "latest");

  async function getTimestamps(_deposits: ethers.Event[]) {
    const promises = deposits.map(async (_deposit) => {
      const block = await _deposit.getBlock();
      return block.timestamp;
    });

    const timestamps = await Promise.all(promises);
    const dates = timestamps.map((timestamp) => parseTimestamp(timestamp * 1000));

    return dates;
  }

  const dates = await getTimestamps(deposits);
  const amounts = deposits.map((deposit) => {
    const amount = ethers.utils.formatEther(deposit.args?.amount);
    return amount
  });

  return { amounts, dates }
}

export function parseTimestamp(timestamp: number): { date: string; hour: string } {
  const dateObj = new Date(timestamp);

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  const hour = dateObj.getHours().toString().padStart(2, '0');
  const minute = dateObj.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  const formattedHour = `${hour}:${minute}`;

  return { date: formattedDate, hour: formattedHour };
}

export function formatDate(inputDate: string): { date: string; hour: string } {
  const parsedDate = new Date(inputDate);

  // Format the date as "dd-mm-yyyy"
  const day = parsedDate.getUTCDate().toString().padStart(2, "0");
  const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based.
  const year = parsedDate.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Format the time as "hh:mm"
  const hours = parsedDate.getUTCHours().toString().padStart(2, "0");
  const minutes = parsedDate.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, hour: formattedTime };
}