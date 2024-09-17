import { ModalGroup } from "@/components/Modal";
import { useEffect, useState } from "react";
import styles from "./modal.module.css";

export const ModalFont = () => {
  const [modalState, setModalState] = useState({
    headersFont: "Inter",
    bodyFont: "Inter",
  });

  const handleUpdateHeadersFont = (font: string) => {
    document.documentElement.style.setProperty("--headers-font", font);
    localStorage.setItem("headersFont", font);
    setModalState(state => ({ ...state, headersFont: font }));
  }

  const handleUpdateBodyFont = (font: string) => {
    document.documentElement.style.setProperty("--body-font", font);
    localStorage.setItem("bodyFont", font);
    setModalState(state => ({ ...state, bodyFont: font }));
  }

  useEffect(() => {
    const headersFont = localStorage.getItem("headersFont");
    const bodyFont = localStorage.getItem("bodyFont");

    if (headersFont) {
      document.documentElement.style.setProperty("--headers-font", headersFont);
      setModalState(state => ({ ...state, headersFont }));
    }

    if (bodyFont) {
      document.documentElement.style.setProperty("--body-font", bodyFont);
      setModalState(state => ({ ...state, bodyFont }));
    }
  }, []);


  return (
    <ModalGroup title="Font">
      <section className={styles.fonts}>
        <section title="Headers Font">
          <p>Headers Font</p>
          <select
            className={styles.modalItem}
            value={modalState.headersFont}
            onChange={(e) => handleUpdateHeadersFont(e.target.value)}
          >
            <option value="Inter">Default</option>
            <option value="Inter">Sans</option>
            <option value="Noto Serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </section>

        <section title="Body Font">
          <p>Body Font</p>
          <select
            className={styles.modalItem}
            value={modalState.bodyFont}
            onChange={(e) => handleUpdateBodyFont(e.target.value)}
          >
            <option value="Inter">Default</option>
            <option value="Inter">Sans</option>
            <option value="Noto Serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </section>
      </section>
    </ModalGroup>
  );
};
