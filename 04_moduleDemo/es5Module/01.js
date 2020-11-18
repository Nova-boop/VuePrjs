// 求和
const sum = function (a, b) {
  return parseInt(a) + parseInt(b);
};

// 求差

const subtract = function (a, b) {
  return parseInt(a) - parseInt(b);
};

// 设定方法可以被外部调用

module.exports = {
  sum,
  subtract,
};
