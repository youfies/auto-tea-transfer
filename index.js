require('dotenv').config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Alamat tujuan dummy untuk contoh
const recipients = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333"
];

const send = async () => {
  const to = recipients[Math.floor(Math.random() * recipients.length)];
  const amount = ethers.parseEther("0.01");

  try {
    const tx = await wallet.sendTransaction({ to, value: amount });
    console.log("Transfer ke", to, "TX:", tx.hash);
  } catch (err) {
    console.error("Gagal transfer:", err.message);
  }
};

const loop = async () => {
  while (true) {
    await send();
    const delay = Math.floor(Math.random() * (5 - 2 + 1) + 2) * 60 * 1000;
    console.log(`Menunggu ${delay / 60000} menit...
`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

loop();
