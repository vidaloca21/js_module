$().ready(function () {
  const token =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjRmNGZjMTI3LWRjMzItNDc1MS05ODgzLTlkODJlZTFiZWUzNSIsIm5iZiI6MTcxODkyNDgxMSwiZ3JhbnRfdHlwZSI6IkNsaWVudCIsImlzcyI6InVub2d3IiwiZXhwIjoxNzE5MDA3MTk5LCJpYXQiOjE3MTg5MjQ4MTEsImp0aSI6IlBTV2kyaXBwT0s1T3hoa3Z1UE5jUWhOYXdmMHlDUVo3NUswVyJ9.J6_MHH66u-pRNPmkbkEDfplA4s-JpB32OJ6X-YSpH0X7wi9uaVjoY5bWYm6MwCP5rMT126HCY_oRESD11zRrCA";
  const data = {
    t1101InBlock: {
      shcode: "078020",
    },
  };
  $.ajax({
    type: "post",
    url: "https://openapi.ls-sec.co.kr:8080/stock/market-data",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.setRequestHeader("Authorization", token);
      xhr.setRequestHeader("tr_cd", "t1101");
      xhr.setRequestHeader("tr_cont", "N");
      xhr.setRequestHeader("tr_cont_key", "");
      xhr.setRequestHeader("mac_address", "");
    },
    data: JSON.stringify(data),
    success: function (res) {
      console.log(JSON.stringify(data));
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    },
  });
});
