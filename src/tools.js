
exports.gcd = function (a, b) {
  while(b) {
    [a, b] = [b, a % b];
  }
  return a;
}

exports.modinv = function (a, b) {
  const s = [];
  while(b) {
    s.push({a, b});
    [a, b] = [b, a % b];
  }
  let x = 1;
  let y = 0;
  for(let i = s.length - 1; i >= 0; --i) {
    [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)];
  }
  return (x % b + b) % b;
}
