"use client";

import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  {
    label: "Collection",
    ariaLabel: "Go to home page",
    link: "/collection",
  },
  {
    label: "About Us",
    ariaLabel: "Go to shop page",
    link: "/about-us",
  },
  { label: "FAQ", ariaLabel: "Go to about page", link: "/faq" },
  {
    label: "Contact",
    ariaLabel: "Go to contact page",
    link: "/contact",
  },
];

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/winnieswwim/" },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      isFixed={true}
      position="left"
      items={menuItems}
      displaySocials
      displayItemNumbering={true}
      menuButtonColor="#000000"
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen={true}
      colors={["#FCF2CD", "#DD8A46"]}
      accentColor="#DD8A46"
      onMenuOpen={() => console.log("Menu opened")}
      onMenuClose={() => console.log("Menu closed")}
      socialItems={socialItems}
    />
  );
}
