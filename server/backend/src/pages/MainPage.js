import classes from "./MainPage.module.scss";

import MainBanner from "../components/main/MainBanner";
import MainContent from "../components/main/MainContent";
import MainRanking from "../components/main/MainRanking";
import CustomAlert from "../UI/Alert";
import { useState } from "react";

const MainPage = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <section>
        <MainBanner />
      </section>
      <section className={classes.about} style={{ backgroundColor: "#022F1C" }}>
        <MainContent />
      </section>
      <section className={classes.ranking}>
        <MainRanking />
      </section>
      {isVisible && (
        <CustomAlert
          title={`나 강림`}
          content={`내용? 그런건 딱히 없지만...`}
          link={`/login`}
          linkName={`로그인페이지로`}
          setter={setVisible}
        />
      )}
    </>
  );
};

export default MainPage;
