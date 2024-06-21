"use client";

import { FC, useEffect, useRef } from "react";
import { MdSunny } from "react-icons/md";
import styles from "./styles.module.css";

interface Props {
	visible: "header" | "sticky";
}

const updateTheme = () => {
	const theme = localStorage.getItem("theme") || "";
	const html = document.querySelector("html");
	if (!html) return;
	html.classList.value = theme;
	return;
};

const storeTheme = () => {
	const theme = document.querySelector("html")?.classList?.value || "";
	localStorage.setItem("theme", theme);
	return;
};

const SwitchTheme: FC<Props> = ({ visible }) => {
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		updateTheme();
	}, []);

	const handleSwitchTheme = () => {
		buttonRef.current?.setAttribute("data-active", "true");
		document.querySelector("html")?.classList.toggle("dark");
		storeTheme();

		const timeout = setTimeout(() => {
			buttonRef.current?.removeAttribute("data-active");
			clearTimeout(timeout);
		}, 500);
		return;
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className={`${styles.theme} theme`}
			onClick={handleSwitchTheme}
			ref={buttonRef}
			aria-hidden="true"
			data-visible={visible}
		>
			<MdSunny />
		</div>
	);
};

export default SwitchTheme;
