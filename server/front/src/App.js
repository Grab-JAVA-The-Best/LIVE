import { Outlet } from "react-router-dom";
import classes from "./App.module.scss";
import { AuthProvider } from "./components/common/AuthProtector";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";

const App = () => {
  return (
    <AuthProvider>
      <div className={classes.App}>
        <Header />
        <section className={classes.wrapper}>
          <Outlet />
        </section>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
