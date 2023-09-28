const {DEVICE_ID, PUBLIC_KEY} = require('./constant');
import crypto from '../crypto';
import {Buffer} from 'buffer';

function genRandomKey_b64(size = 32) {
  const key = crypto.randomBytes(size);
  return Buffer.from(key).toString('base64');
}

const SecurePK = {
  priv_key_b64: '',
  peer_pub_key_b64: '',
  shared_secret_key_b64: '',
};

export function encKey(data) {
  const publicKey = Buffer.from(PUBLIC_KEY);
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(data),
  );
  console.log(encryptedData, 'clicked', publicKey);
  return encryptedData.toString('base64');
}

export function encPayload(secretKey) {
  console.log('clicked11111');
  let data = {
    country_code: '91',
    phone: '1234567890',
    device_id: DEVICE_ID,
    notification_token: 'xxxx-yyyyy',
    created_at: new Date().toISOString(),
  };
  data = JSON.stringify(data);

  if (typeof secretKey === 'undefined') {
    secretKey = genRandomKey_b64(32);
  }
  const key = Buffer.from(secretKey, 'base64');

  const iv = crypto.randomBytes(12);

  let cipher = crypto.createCipheriv('chacha20-poly1305', key, iv, {
    authTagLength: 16,
  });

  // const cipherText = cipher.update(data);
  const cipherText = Buffer.concat([
    cipher.update(Buffer.from(data), 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    cipherText: Buffer.concat([iv, cipherText, authTag]).toString('base64'),
    key: key.toString('base64'),
  };
}

export function genKeys() {
  const pk = crypto.generateKeyPairSync('x25519');

  // store privKeyPem securely in keystore
  const privKeyPem = pk.privateKey.export({type: 'pkcs8', format: 'pem'});

  const pubKeyPem = pk.publicKey.export({type: 'spki', format: 'pem'});

  SecurePK.priv_key_b64 = Buffer.from(privKeyPem, 'utf-8').toString('base64');

  return Buffer.from(pubKeyPem, 'utf8').toString('base64');
}

export function genSharedSecret() {
  priv_key = crypto.createPrivateKey(
    Buffer.from(SecurePK.priv_key_b64, 'base64'),
  );
  pub_key = crypto.createPublicKey(
    Buffer.from(SecurePK.peer_pub_key_b64, 'base64'),
  );
  const shared_key = crypto.diffieHellman({
    publicKey: pub_key,
    privateKey: priv_key,
  });

  const derived_shared_key = crypto.hkdfSync('sha256', shared_key, '', '', 32);
  const derived_shared_key_b64 =
    Buffer.from(derived_shared_key).toString('base64');

  return derived_shared_key_b64;
}
