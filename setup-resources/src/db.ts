import "dotenv/config";
import { CosmosClient } from "@azure/cosmos";
import { HttpsProxyAgent } from "https-proxy-agent";

// 接続情報を個別に環境変数から取得
const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;
console.log("Cosmos DB Endpoint: " + endpoint);

// プロキシ設定（HTTPS_PROXY または HTTP_PROXY）を環境変数から取得
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
let agent;
if (proxyUrl) {
  console.log(`Using proxy: ${proxyUrl}`);
  agent = new HttpsProxyAgent(proxyUrl);
}

let client = null;
if (endpoint && key) {
  // 1 つのオブジェクトにすべての設定を統合する
  client = new CosmosClient({ endpoint, key, agent });
} else {
  console.log("Cannot locate Cosmos DB endpoint or key.");
}

export default client;

// 以下、元のコード
// import 'dotenv/config'

// import {
//     CosmosClient,
//   } from "@azure/cosmos";

// let client = null;

// const connString = process.env.COSMOSDB_CONNECTION_STRING;

// console.log('Connection string: ' + process.env.COSMOSDB_CONNECTION_STRING);

// if(connString) {
//     client = new CosmosClient(connString);
// } else {
//     console.log('Cannot locate Cosmos DB endpoint from connection string.');
// }

// export default client;
