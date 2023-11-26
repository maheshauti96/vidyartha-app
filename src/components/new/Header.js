import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  return (
    <div className="header-container">
      <header className="header">
        <Link href='/' >
          <img className="landingpage-banner-img" src="/vidyartha-logo.svg" alt="vidyartha-logo" />
        </Link>
        <div className="header-links">
          <div
            className={`${
              router.pathname === "/" ? "active" : ""
            }`}
          >
            <Link href="/">Homepage</Link>
          </div>
          <div className={`${router.pathname.includes('/campaigns') ? "active" : ""}`}>
            <Link href="/campaigns">Campaigns</Link>
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
                  router.pathname === "/" ? "active" : ""
                }`}
              >
                <Link href="/">Homepage</Link>
              </div>
              <div
                className={`${router.pathname.includes('/campaigns') ? "active" : ""}`}
              >
                <Link href="/campaigns">Campaigns</Link>
              </div>
              {/* <div
                className={`${
                  router.pathname.includes("/news-and-stories") ? "active" : ""
                }`}
              >
                <Link href="/news-and-stories">News and Stories</Link>
              </div> */}
              <div
                className={`${router.pathname.includes("/aboutus") ? "active" : ""}`}
              >
                <Link href="/aboutus">About</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
