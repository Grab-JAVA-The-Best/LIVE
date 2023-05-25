import classes from "./Footer.module.scss";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
} from "../../assets/Icons";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footerInner}>
        <div className={classes.item}>
          <ul className={classes.partList}>
            <li>회사소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>매물관리규정</li>
          </ul>
          <div className={classes.footerDesc}>
            © SSAFY Corp.Live.All rights Reserved
          </div>
        </div>
        <div className={classes.snsIcon}>
          <span>
            <FacebookIcon />
          </span>
          <span>
            <InstagramIcon />
          </span>
          <span>
            <YoutubeIcon />
          </span>
          <span>
            <TwitterIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
