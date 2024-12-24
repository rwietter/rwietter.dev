import { ModalGroup } from "@/components/Modal";
import React from "react";
import { BiMoon } from "react-icons/bi";
import { GiDesert, GiNightSky, GiRose } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import styles from "./modal.module.css";
import { LiaRaspberryPi } from "react-icons/lia";

const propsIfThemeIsActive = (activityTheme: string) => (theme: string) => ({
	background:
		activityTheme === theme ? "var(--neutral)" : "var(--bg-alt-color)",
	transition: "var(--transition-primary)",
});

const ModalTheme = () => {
	const [state, setState] = React.useState({
		activityTheme: "light",
	});

	const handleSetTheme = (theme: string) => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
		setState({ activityTheme: theme });
	};

	const themeProps = propsIfThemeIsActive(state.activityTheme);

	React.useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme) setState({ activityTheme: theme });
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent, theme: string) => {
		if (event.key === "Enter" || event.key === " ") {
			handleSetTheme(theme);
		}
	};

	return (
		<ModalGroup title="Theme" aria-modal="true" role="dialog">
			<fieldset className={styles.themes}>
				<legend className="sr-only">Select Theme</legend>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("light") }}
					aria-label="Light theme"
					aria-pressed={state.activityTheme === "light"}
					onClick={() => handleSetTheme("light")}
					onKeyDown={(e) => handleKeyDown(e, "light")}
					type="button"
				>
					<MdSunny size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("dark") }}
					aria-label="Dark theme"
					aria-pressed={state.activityTheme === "dark"}
					onClick={() => handleSetTheme("dark")}
					onKeyDown={(e) => handleKeyDown(e, "dark")}
					type="button"
				>
					<BiMoon size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("desert") }}
					aria-label="Desert theme"
					aria-pressed={state.activityTheme === "desert"}
					onClick={() => handleSetTheme("desert")}
					onKeyDown={(e) => handleKeyDown(e, "desert")}
					type="button"
				>
					<GiDesert size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("nord-light") }}
					aria-label="Nord light theme"
					aria-pressed={state.activityTheme === "nord-light"}
					onClick={() => handleSetTheme("nord-light")}
					onKeyDown={(e) => handleKeyDown(e, "nord-light")}
					type="button"
				>
					<GiRose size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("periwinkle") }}
					aria-label="Periwinkle theme"
					aria-pressed={state.activityTheme === "periwinkle"}
					onClick={() => handleSetTheme("periwinkle")}
					onKeyDown={(e) => handleKeyDown(e, "periwinkle")}
					type="button"
				>
					<LiaRaspberryPi size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps("noveau") }}
					aria-label="Noveau theme"
					aria-pressed={state.activityTheme === "noveau"}
					onClick={() => handleSetTheme("noveau")}
					onKeyDown={(e) => handleKeyDown(e, "noveau")}
					type="button"
				>
					<GiNightSky size={22} />
				</button>

				<div aria-live="polite" className="sr-only">
					{`Theme changed to ${state.activityTheme}`}
				</div>
			</fieldset>
		</ModalGroup>
	);
};

export default ModalTheme;
