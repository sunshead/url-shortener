var CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ";
var base = CHARS.length; //62

//convert base 10 integer to base 62 string, 除二取余法
function base10_to_62(n) {
	if (n > base) {
		return base10_to_62(Math.floor(n / base)) + CHARS[n % base];
	} else {
		return CHARS[n];
	}
}

function encode(n) {
	var short_url = base10_to_62(n);
	while (short_url.length < 5) { // Add padding
	                short_url = CHARS[0] + short_url;
	            }
	return short_url;
}

//convert base 62 string to base 10 integer
function decode(s) {
	var num = 0;
	while (s) {
		var index = CHARS.indexOf(s[0]);
		var power = s.length - 1;
		num += index * (Math.pow(base, power));
		s = s.substring(1);
	}
	return num;
}

module.exports.encode = encode;
module.exports.decode = decode;