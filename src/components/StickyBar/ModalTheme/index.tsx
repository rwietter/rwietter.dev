import { ModalGroup } from "@/components/Modal";
import React from "react";
import { BiMoon } from "react-icons/bi";
import { GiDesert, GiNightSky, GiRose } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import styles from "./modal.module.css";

const propsIfThemeIsActive = (activityTheme: string) => (theme: string) => ({
  background:
    activityTheme === theme ? "var(--neutral)" : "var(--bg-alt-color)",
  transition: "var(--transition-primary)",
});

export const ModalTheme = () => {
  const [modalState, setModalState] = React.useState({
    activityTheme: "light",
  });

  const handleSetTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setModalState({ activityTheme: theme });
  };

  const themeProps = propsIfThemeIsActive(modalState.activityTheme);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setModalState({ activityTheme: theme });
  }, []);

  return (
    <ModalGroup title="Theme">
      <div
        className={styles.modalItem}
        style={{ ...themeProps("light") }}
        role="button"
        onKeyUp={() => { }}
        onClick={() => handleSetTheme("light")}
      >
        <MdSunny
          size={22}
          style={{
            cursor: "pointer",
            alignSelf: "center",
          }}
        />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps("dark") }}
        role="button"
        onKeyUp={() => { }}
        onClick={() => handleSetTheme("dark")}
      >
        <BiMoon size={22} style={{ cursor: "pointer" }} />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps("desert") }}
        role="button"
        onKeyUp={() => { }}
        onClick={() => handleSetTheme("desert")}
      >
        <GiDesert size={22} style={{ cursor: "pointer" }} />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps("nord-light") }}
        role="button"
        onKeyUp={() => { }}
        onClick={() => handleSetTheme("nord-light")}
      >
        <GiRose size={22} style={{ cursor: "pointer" }} />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps("noveau") }}
        role="button"
        onKeyUp={() => { }}
        onClick={() => handleSetTheme("noveau")}
      >
        <GiNightSky size={22} style={{ cursor: "pointer" }} />
      </div>
    </ModalGroup>
  );
};
