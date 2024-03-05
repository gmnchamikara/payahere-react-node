const md5 = require("crypto-js/md5");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
      const data = {
        merchantId: "1226089",
        return_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/",
        notify_url: "http://sample.com/notify",
        merchantSecret:
          "Mzg3OTY0OTEwMDQxOTg2ODQxODY0MTAyNjU3MjYxMjM1NzM2NzUwMg==",
        first_name: "Akila",
        last_name: "Gunasekara",
        email: "akilagunasekara@gmail.com",
        phone: "0770473392",
        address: "No.1, Galle Road",
        city: "Colombo",
        country: "Sri Lanka",
        orderId: "12345",
        items: "Chair",
        currency: "LKR",
        amount: 5000,
      };

      const hash = generateHash(data);

      // Create a new object that includes both data and hash
      const responseData = {
        ...data,
        hash: hash,
      };

      res.send(responseData);
      console.log(`Server Data is ${responseData}`);
});

function generateUniqueId() {
  return "ItemNo" + Math.random().toString(36).substr(2, 9);
}

function generateHash(data) {
  const { merchantId, orderId, amount, currency, merchantSecret } = data;
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();
  return hash;
}

function numberFormat(amount, decimals) {
  return amount.toFixed(decimals).replace(".", "");
}

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
