var CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ";
var base = CHARS.length; //62

//convert base 10 integer to base 62 string, 除二取余法
function encode(n) {
	if (n > 62) {
		return encode(Math.floor(n / 62)) + CHARS[n % 62];
	} else {
		return CHARS[n];
	}
}

//convert base 62 string to base 10 integer
function decode(s) {
	var num = 0;
	while (str) {
		var index = CHARS.indexOf(s[0]);
		var power = s.length - 1;
		num += index * (Math.pow(base, power));
		s = s.substring(1);
	}
	return num;
}

module.exports.encode = encode;
module.exports.decode = decode;