# 🧮 Calculator Solana DApp

A beginner-friendly decentralized calculator app built on the Solana blockchain using the `create-solana-dapp` scaffold and Anchor framework. This app allows users to create a calculator account on-chain and perform simple arithmetic operations like **addition** and **subtraction**.

## 🚀 Getting Started

Follow these simple steps to get the DApp up and running on your local machine.

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)
- [Phantom Wallet](https://phantom.app/)
- WSL (for Windows users)

---

## 🧩 Setup Instructions

### 0. Install dependencies
```bash
npm install
```

### 1. Launch WSL (If you're using Windows)
```bash
wsl
```

---

### 2. Start Local Solana Validator
In your terminal, run:
```bash
solana-test-validator
```
> Keep this terminal open — it acts as your local Solana blockchain!

---

### 3. Open a new WSL-enabled terminal

### 4. Navigate to the Anchor program folder:
```bash
cd anchor
```

### 5. Sync Anchor keys:
```bash
anchor keys sync
```

### 6. Build the program:
```bash
anchor build
```

### 7. Deploy the program to localnet:
```bash
anchor deploy
```

---

### 8. Start the frontend
Return to the root project directory and run:
```bash
cd .. && npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

---

## 🧙 Phantom Wallet Setup

1. Install [Phantom Wallet](https://phantom.app/) as a browser extension.
2. Switch the network to **Localnet** inside Phantom settings.
3. Airdrop some SOL to your wallet for testing:
   ```bash
   solana airdrop 2 <YOUR_PUBLIC_KEY>
   ```
   *(Or use the "Request Airdrop" button in the DApp)*

---

## 🧮 Using the Calculator

1. Go to:
   ```
   http://localhost:3000/cdemo
   ```
2. Click **"Create Calculator Account"** — this will initialize a calculator account on-chain.
3. Now you can:
   - Add two numbers
   - Subtract two numbers
   - View the result instantly on the UI
---
