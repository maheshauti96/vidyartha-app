import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = ({ orgCode }) => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  const orgPath = orgCode ? orgCode.toUpperCase() : ""
  return (
    <div className="header-container">
      <header className="header">
        <a href={`/${orgPath}`} >
          <img className="landingpage-banner-img" src="/vidyartha-logo.svg" alt="vidyartha-logo" />
        </a>
        <div className="header-links">
          <div
            className={`${
              router.pathname === "/" ? "active" : ""
            }`}
          >
            <a href={`/${orgPath}`}>Homepage</a>
          </div>
          <div className={`${router.pathname.includes('/campaigns') ? "active" : ""}`}>
            <Link href={`/${orgPath}/campaigns`}>Campaigns</Link>
          </div>
          <div
            className={`${
              router.pathname.includes("/news-and-stories") ? "active" : ""
            }`}
          >
            <Link href={`/${orgPath}/news-and-stories`}>News and Stories</Link>
          </div>
          <div className={`${router.pathname.includes("/aboutus")  ? "active" : ""}`}>
            <Link href={`/${orgPath}/aboutus`}>About</Link>
          </div>
        </div>

        <button
          className="expand-button"
          onClick={() => {
            setExpand((prev) => !prev);
          }}
        >
          <img src="/expand-menu.svg" />
        </button>

        {expand && (
          <div className="expand-menu-list">
            <button onClick={() => {setExpand(prev => !prev)}}>x</button>
            <div className="link-list">
              <div
                className={`${
                  router.pathname === "/" ? "active" : ""
                }`}
              >
                <a href={`/${orgPath}`}>Homepage</a>
              </div>
              <div
                className={`${router.pathname.includes('/campaigns') ? "active" : ""}`}
              >
                <Link href={`/${orgPath}/campaigns`}>Campaigns</Link>
              </div>
              <div
                className={`${
                  router.pathname.includes("/news-and-stories") ? "active" : ""
                }`}
              >
                <Link href={`/${orgPath}/news-and-stories`}>News and Stories</Link>
              </div>
              <div
                className={`${router.pathname.includes("/aboutus") ? "active" : ""}`}
              >
                <Link href={`/${orgPath}/aboutus`}>About</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
