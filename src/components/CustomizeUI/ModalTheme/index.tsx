import { ModalGroup } from '@/components/Modal'
import React from 'react'
import styles from './modal.module.css'
import {
	PiAcornDuotone,
	PiBalloonLight,
	PiCactusThin,
	PiMoonThin,
	PiPlanetDuotone,
	PiSunDimThin,
} from 'react-icons/pi'

const propsIfThemeIsActive = (activityTheme: string) => (theme: string) => ({
	background:
		activityTheme === theme ? 'var(--neutral)' : 'var(--bg-alt-color)',
	transition: 'var(--transition-primary)',
})

const ModalTheme = () => {
	const [state, setState] = React.useState({
		activityTheme: 'light',
	})

	const handleSetTheme = (theme: string) => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
		setState({ activityTheme: theme })
	}

	const themeProps = propsIfThemeIsActive(state.activityTheme)

	React.useEffect(() => {
		const theme = localStorage.getItem('theme')
		if (theme) setState({ activityTheme: theme })
	}, [])

	const handleKeyDown = (event: React.KeyboardEvent, theme: string) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleSetTheme(theme)
		}
	}

	return (
		<ModalGroup title='Theme' aria-modal='true' role='dialog'>
			<fieldset className={styles.themes}>
				<legend className='sr-only'>Select Theme</legend>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('light') }}
					aria-label='Light theme'
					aria-pressed={state.activityTheme === 'light'}
					onClick={() => handleSetTheme('light')}
					onKeyDown={(e) => handleKeyDown(e, 'light')}
					type='button'
				>
					<PiSunDimThin size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('dark') }}
					aria-label='Dark theme'
					aria-pressed={state.activityTheme === 'dark'}
					onClick={() => handleSetTheme('dark')}
					onKeyDown={(e) => handleKeyDown(e, 'dark')}
					type='button'
				>
					<PiMoonThin size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('dune') }}
					aria-label='Dune theme'
					aria-pressed={state.activityTheme === 'dune'}
					onClick={() => handleSetTheme('dune')}
					onKeyDown={(e) => handleKeyDown(e, 'dune')}
					type='button'
				>
					<PiCactusThin size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('nord-light') }}
					aria-label='Nord light theme'
					aria-pressed={state.activityTheme === 'nord-light'}
					onClick={() => handleSetTheme('nord-light')}
					onKeyDown={(e) => handleKeyDown(e, 'nord-light')}
					type='button'
				>
					<PiBalloonLight size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('slate') }}
					aria-label='Slate theme'
					aria-pressed={state.activityTheme === 'slate'}
					onClick={() => handleSetTheme('slate')}
					onKeyDown={(e) => handleKeyDown(e, 'slate')}
					type='button'
				>
					<PiPlanetDuotone size={22} />
				</button>

				<button
					className={styles.modalItem}
					style={{ ...themeProps('noveau') }}
					aria-label='Noveau theme'
					aria-pressed={state.activityTheme === 'noveau'}
					onClick={() => handleSetTheme('noveau')}
					onKeyDown={(e) => handleKeyDown(e, 'noveau')}
					type='button'
				>
					<PiAcornDuotone size={22} />
				</button>

				<div aria-live='polite' className='sr-only'>
					{`Theme changed to ${state.activityTheme}`}
				</div>
			</fieldset>
		</ModalGroup>
	)
}

export default ModalTheme
