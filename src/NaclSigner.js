import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util'
import base64Url from 'base64url'
/**
*  The NaclSigner returns a configured function for signing data using the Ed25519 algorithm. It also defines
*  an interface that you can also implement yourself and use in our other modules.
*
*  The signing function itself takes the data as a string parameter and returls a base64Url encoded signature
*
*  @example
*  const signer = NaclSigner(process.env.PRIVATE_KEY)
*  signer(data, (err, signature) => {
*    ...
*  })
*
*  @param    {String}         base64PrivateKey    a 64 byte base64 encoded private key
*  @return   {Function}                     a configured signer function
*/

export default function (base64PrivateKey) {
  const privateKey = naclutil.decodeBase64(base64PrivateKey)
  return async (data) => {
    return base64Url.encode(nacl.sign.detached(naclutil.decodeUTF8(data), privateKey))
  }
}
