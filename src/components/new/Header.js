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
              router.pathname === "/new-landing-page" ? "active" : ""
            }`}
          >
            <Link href="/new-landing-page">Homepage</Link>
          </div>
          <div className={`${router.pathname.includes('new-funds-page') ? "active" : ""}`}>
            <Link href="/new-funds-page">Funds</Link>
          </div>
          <div
            className={`${
              router.pathname.includes("/news-and-stories") ? "active" : ""
            }`}
          >
            <Link href="/news-and-stories">News and Stories</Link>
          </div>
          <div className={`${router.pathname.includes("/new-about-us")  ? "active" : ""}`}>
            <Link href="/new-about-us">About</Link>
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
                  router.pathname === "/new-landing-page" ? "active" : ""
                }`}
              >
                <Link href="/new-landing-page">Homepage</Link>
              </div>
              <div
                className={`${router.pathname.includes('new-funds-page') ? "active" : ""}`}
              >
                <Link href="/new-funds-page">Funds</Link>
              </div>
              <div
                className={`${
                  router.pathname.includes("/news-and-stories") ? "active" : ""
                }`}
              >
                <Link href="/news-and-stories">News and Stories</Link>
              </div>
              <div
                className={`${router.pathname.includes("/new-about-us") ? "active" : ""}`}
              >
                <Link href="/new-about-us">About</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;