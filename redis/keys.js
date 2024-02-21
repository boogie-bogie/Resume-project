/**Redis 해시 Key 생성 함수
 * mainKey: tokenKey#userId:1
 * subKey: token
 * value: ETRTWER#@%@# */

exports.tokenKey = (userId) => {
  return `tokens#userId:${userId}`;
};
