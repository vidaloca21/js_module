function convertUnicode(str) {}

let codeArray = ["삼성전자", "제일기획", "경동나비엔", "동화제약"];
document.addEventListener("DOMContentLoaded", function () {
  console.log(convertUnicode("국성전자"));
  var result = codeArray.filter((elm) => convertUnicode(elm) == 0);
  console.log(result);
});
