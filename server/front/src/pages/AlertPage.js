import classes from "./AlertPage.module.scss";
import { getAlertList } from "../apis/noticeApis";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AlertPage = () => {
  const [notice, setNotice] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navi = useNavigate();

  useEffect(()=>{
    async function fetchData() {
      const alertList = await getAlertList();
      setNotice(alertList);
    }
    fetchData();
  }, []);
  

  if (!userInfo.auth && notice)
    return (
      <>
        <div className={classes.alarm}>
          <div className={classes.alarmContent}>
            <div className={classes.inner}>
              <br/>
              <h3>알람</h3>
              <div className={classes.alarmTable}>
                <table>
                  <thead>
                    <tr className={classes.tableHead}>
                      <td> 수신자</td>
                      <td> 날짜 </td>
                      <td> 시간 </td>
                      <td> 알람내용</td>
                    </tr>
                  </thead>
                  <tbody className={classes.tableBody}>
                    {notice.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>
                            <span>{item.noticeWriter}</span>
                          </td>
                          <td>{item.noticeDate.substring(0, 4)+"년 "
                          + item.noticeDate.substring(5, 7)+"월 "
                          +item.noticeDate.substring(8, 10)+"일"}</td>
                          <td>{item.noticeDate.substring(11, 13)+"시 "
                          + item.noticeDate.substring(14, 16)+"분"
                          }</td>
                          <td>{item.noticeInfo}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    else {
      return (
        <>
          <div className={classes.alarm}>
            <div className={classes.alarmContent}>
              <div className={classes.inner}>
                <br/>
                <h3>알람</h3>
                <div className={classes.alarmTable}>
                  <table>
                    <thead>
                      <tr className={classes.tableHead}>
                        <td> 수신자</td>
                        <td> 날짜 </td>
                        <td> 시간 </td>
                        <td> 알람내용</td>
                      </tr>
                    </thead>
                    <tbody className={classes.tableBody}>
                    </tbody>
                  </table>
                  <h3>
                    아직 등록된 알람이 없어요.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      );rn 
    }
};

export default AlertPage;
