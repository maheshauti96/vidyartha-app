import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  return (
    <div className="header-container">
      <header className="header">
        <img className="landingpage-banner-img" src="/vidyartha-logo.svg" alt="vidyartha-logo" />
        <div className="header-links">
          <div
            className={`${
              router.pathname === "/" ? "active" : ""
            }`}
          >
            <Link href="/">Homepage</Link>
          </div>
          <div className={`${router.pathname.includes('/funds') ? "active" : ""}`}>
            <Link href="/funds">Funds</Link>
          </div>
          {/* <div
            className={`${
              router.pathname.includes("/news-and-stories") ? "active" : ""
            }`}
          >
            <Link href="/new/news-and-stories">News and Stories</Link>
          </div> */}
          <div className={`${router.pathname.includes("/aboutus")  ? "active" : ""}`}>
            <Link href="/aboutus">About</Link>
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
                  router.pathname === "/new" ? "active" : ""
                }`}
              >
                <Link href="/new">Homepage</Link>
              </div>
              <div
                className={`${router.pathname.includes('/new/funds') ? "active" : ""}`}
              >
                <Link href="/new/funds">Funds</Link>
              </div>
              {/* <div
                className={`${
                  router.pathname.includes("/new/news-and-stories") ? "active" : ""
                }`}
              >
                <Link href="/new/news-and-stories">News and Stories</Link>
              </div> */}
              <div
                className={`${router.pathname.includes("/new/aboutus") ? "active" : ""}`}
              >
                <Link href="/new/aboutus">About</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
