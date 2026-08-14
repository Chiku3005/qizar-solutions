import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

import "./Navbar.css";

import logoSymbol from "../../assets/logos/logo-symbol.png";
import logoText from "../../assets/logos/logo-text.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // =====================================================
  // SCROLL DETECTION
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // NAVIGATION LINKS
  // =====================================================

  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Services",
      href: "#services",
    },
    {
      name: "Products",
      href: "/products",
      isPage: true,
    },
    {
      name: "Technology",
      href: "#technology",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  // =====================================================
  // HOME SECTION NAVIGATION
  // =====================================================

  const handleSectionClick = (event, href) => {
    event.preventDefault();

    setMenuOpen(false);

    // If we are NOT on Home, first go Home
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return;
    }

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(
        null,
        "",
        href
      );
    }
  };

  // =====================================================
  // LOGO CLICK
  // =====================================================

  const handleLogoClick = (event) => {
    event.preventDefault();

    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.pushState(
      null,
      "",
      "#home"
    );
  };

  return (
    <nav
      className={`
        navbar
        ${scrolled ? "navbar-scrolled" : ""}
      `}
    >

      {/* =================================================
          LOGO
      ================================================= */}

      <a
        href="/"
        className="navbar-logo"
        onClick={handleLogoClick}
        aria-label="Qizar Solutions Home"
      >

        <img
          src={logoSymbol}
          alt="Qizar Solutions Symbol"
          className="logo-symbol"
        />

        <img
          src={logoText}
          alt="Qizar Solutions Pvt. Ltd."
          className="logo-text"
        />

      </a>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <ul
        className={`
          nav-links
          ${menuOpen ? "active" : ""}
        `}
      >

        {navLinks.map((link) => (

          <li key={link.name}>

            {/* =================================================
                PRODUCTS = REAL PAGE
                DO NOT USE SCROLL HANDLER
            ================================================= */}

            {link.isPage ? (

              <Link
                to="/products"
                className="nav-page-link"
                onClick={() => {
                  setMenuOpen(false);

                  window.scrollTo({
                    top: 0,
                    behavior: "instant",
                  });
                }}
              >
                Products
              </Link>

            ) : (

              /* =================================================
                 OTHER LINKS = HOME SECTIONS
              ================================================= */

              <a
                href={link.href}
                onClick={(event) =>
                  handleSectionClick(
                    event,
                    link.href
                  )
                }
              >
                {link.name}
              </a>

            )}

          </li>

        ))}


        {/* =================================================
            LET'S TALK
        ================================================= */}

        <li className="nav-button-wrapper">

          <a
            href="#contact"
            className="nav-btn"
            onClick={(event) =>
              handleSectionClick(
                event,
                "#contact"
              )
            }
          >

            <span>
              Let's Talk
            </span>

            <FaArrowRight
              className="nav-btn-icon"
            />

          </a>

        </li>

      </ul>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <button
        type="button"
        className={`
          menu-icon
          ${menuOpen ? "menu-open" : ""}
        `}
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
      >

        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}

      </button>

    </nav>
  );
}

export default Navbar;