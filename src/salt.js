import { randomBytes } from "ethers";


export const generateSalt = () => {
  const bytes = randomBytes(8);
  console.log(bytes);
  const bytesHex = bytes.reduce((o, v) => o + ('00' + v.toString(16)).slice(-2), '');
  return BigInt('0x' + bytesHex).toString(10);


  
};