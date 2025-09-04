// services/mikrotikService.js
const { RouterOSClient } = require('mikrotik-api');
require('dotenv').config();

const client = new RouterOSClient({
  host: process.env.MIKROTIK_HOST,
  user: process.env.MIKROTIK_USER,
  password: process.env.MIKROTIK_PASSWORD,
  port: process.env.MIKROTIK_PORT || 8728,
});

async function connect() {
  const api = await client.connect();
  return api;
}

exports.addUser = async (mac, password, comment) => {
  const api = await connect();
  const result = await api.write('/ip/hotspot/user/add', [
    `=name=${mac}`,
    `=password=${password}`,
    `=comment=${comment}`,
    `=profile=default`, // you can change this
  ]);
  api.close();
  return result;
};

exports.kickUser = async (mac) => {
  const api = await connect();
  const activeUsers = await api.write('/ip/hotspot/active/print');
  const user = activeUsers.find(u => u.user === mac);

  if (!user) throw new Error('User not found in active list');

  const result = await api.write('/ip/hotspot/active/remove', [
    `=.id=${user['.id']}`,
  ]);
  api.close();
  return result;
};

exports.getActiveUsers = async () => {
  const api = await connect();
  const users = await api.write('/ip/hotspot/active/print');
  api.close();
  return users;
};
