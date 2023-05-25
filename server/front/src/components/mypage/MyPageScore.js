const MyPageScore = ({ score }) => {
  switch (true) {
    case score <= 0.0:
      return <img src={require("../../assets/score/score_0.png")}></img>;
      break;
    case score < 10.0:
      return <img src={require("../../assets/score/score_1.png")}></img>;
      break;
    case score < 20.0:
      return <img src={require("../../assets/score/score_2.png")}></img>;
      break;
    case score < 30.0:
      return <img src={require("../../assets/score/score_3.png")}></img>;
      break;
    case score < 40.0:
      return <img src={require("../../assets/score/score_4.png")}></img>;
      break;
    case score < 50.0:
      return <img src={require("../../assets/score/score_5.png")}></img>;
      break;
    case score < 60.0:
      return <img src={require("../../assets/score/score_6.png")}></img>;
      break;
    case score < 70.0:
      return <img src={require("../../assets/score/score_7.png")}></img>;
      break;
    case score < 80.0:
      return <img src={require("../../assets/score/score_8.png")}></img>;
      break;
    case score < 90.0:
      return <img src={require("../../assets/score/score_9.png")}></img>;
      break;
    case score >= 90.0:
      return <img src={require("../../assets/score/score_10.png")}></img>;
      break;
  }
};

export default MyPageScore;
