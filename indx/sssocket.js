$().ready(function () {
  const dummyData = {
    header: {
      tr_cd: "H1_",
      tr_key: "005930",
    },
    body: {
      offerrem2: "144634",
      offerho4: "80800",
      bidho5: "80000",
      offerho3: "80700",
      offerrem3: "131076",
      bidho4: "80100",
      offerrem4: "98571",
      offerho6: "81000",
      bidho7: "79800",
      offerho5: "80900",
      offerrem5: "93978",
      bidho6: "79900",
      offerho8: "81200",
      bidho9: "79600",
      offerho7: "81100",
      bidho8: "79700",
      offerrem1: "267534",
      offerho9: "81300",
      offerrem6: "104735",
      offerrem7: "23656",
      donsigubun: "1",
      offerrem8: "35848",
      offerrem9: "31576",
      bidrem3: "164949",
      bidrem4: "229515",
      bidrem1: "59544",
      bidrem2: "195232",
      bidrem9: "159722",
      bidho1: "80400",
      bidrem7: "144425",
      bidrem8: "173149",
      hotime: "150403",
      offerho2: "80600",
      bidho3: "80200",
      bidrem5: "541198",
      offerho1: "80500",
      bidho2: "80300",
      bidrem6: "201187",
      bidrem10: "261797",
      bidho10: "79500",
      shcode: "005930",
      alloc_gubun: "",
      volume: "13027064",
      offerho10: "81400",
      offerrem10: "37746",
      totofferrem: "969354",
      totbidrem: "2130718",
    },
  };

  let ws = undefined;
  const _END_POINT_ = "wss://openapi.ls-sec.co.kr:9443/websocket";
  const data = {
    header: {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjA1MzM1YjhiLWUxYTQtNGQ5ZC1hMzlmLTZhOWNhM2ZkM2E1ZiIsIm5iZiI6MTcxOTE4NDQyNiwiZ3JhbnRfdHlwZSI6IkNsaWVudCIsImlzcyI6InVub2d3IiwiZXhwIjoxNzE5MjY2Mzk5LCJpYXQiOjE3MTkxODQ0MjYsImp0aSI6IlBTV2kyaXBwT0s1T3hoa3Z1UE5jUWhOYXdmMHlDUVo3NUswVyJ9.OHetUvNkQLefzFK3BoWGWiLHvscGu969ogaB1ntuRxflrwe1NroahKNIo8H9sgFJxMvnv3ka-beLSsfiMPbjvw",
      tr_type: "3",
    },
    body: {
      tr_cd: "H1_",
      tr_key: "005930",
    },
  };
  const message = JSON.stringify(data);

  const openSocket = () => {
    console.log(1);
    if (!ws) {
      ws = new WebSocket(_END_POINT_);
    }

    ws.onopen = () => {
      ws.send(message);
      console.log("Socket Open");
    };

    ws.onmessage = async (result) => {
      try {
        const recvMsg = await new Response(result.data).json();
        if (recvMsg && recvMsg.body) {
          console.log(recvMsg);
          $("#content").append(`<p>${{ ...recvMsg.body }}</p>`);
        }
      } catch (err) {
        console.log(err);
      }
    };

    ws.onclose = () => {
      console.log("Socket Closed");
    };
  };

  const closeSocket = () => {
    console.log(2);
    if (ws) {
      ws.close();
      ws = undefined;
    }
  };

  $("#open").click(openSocket);
  $("#close").click(closeSocket);
});
