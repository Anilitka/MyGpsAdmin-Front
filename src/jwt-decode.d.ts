declare module 'jwt-decode' {
  function jwt_decode<T>(token: string): T;
  export default jwt_decode;
}
