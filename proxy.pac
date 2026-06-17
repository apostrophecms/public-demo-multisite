function FindProxyForURL(url, host) {
  if (shExpMatch(host, '*.multi')) {
    return 'PROXY localhost:3000';
  }
  return 'DIRECT';
}
