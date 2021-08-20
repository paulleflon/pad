import React from 'react';
import AudioManager from '../audio/AudioManager';
import '../style/Pad.sass';
import ButtonProperties from '../types/ButtonProperties';
import PadButtonProps from '../types/PadButtonProps';
import PadProps from '../types/PadProps';
import PadState from '../types/PadState';
import ButtonConfigurator from './ButtonConfigurator';
import PadButton from './PadButton';

/**
 * The main Pad component. 
 */
class Pad extends React.Component<PadProps, PadState> {
	/**
	 * The AudioManager bound to this Pad.
	 */
	audio: AudioManager;

	constructor(props: PadProps) {
		super(props);
		this.audio = new AudioManager;
		const stored = localStorage.getItem('buttonProperties');
		let properties: ButtonProperties[][];
		if (stored) {
			try {
				properties = JSON.parse(stored);
				for (const row of properties) {
					for (const i in row) {
						// We firs make sure all the properties are in the object, in case of update
						// Then we load the saved properties
						// And finally force `active` to be false.
						row[i] = { ...PadButton.defaultProperties, ...row[i], active: false };
						if (row[i].audio) {
							this.audio.loadSound(row[i].audio).then(success => {
								if (!success)
									this.updateButtonProperties(row[i].position, { failing: true });
							});
						}
					}
				}
			} catch (err) {
				properties = this.generateDefaultButtons();
			}
		} else
			properties = this.generateDefaultButtons();
		this.state = {
			freezed: false,
			pressedButtons: [],
			buttonProperties: properties
		};
		localStorage.setItem('buttonProperties', JSON.stringify(properties));
	}

	componentDidMount(): void {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.code === 'Escape')
				this.setState({ selectedButton: undefined, freezed: false });
			if (e.shiftKey || this.state.freezed)
				return;
			if (!this.state.pressedButtons.includes(e.code))
				this.addPressed(e.code);
		});
		window.addEventListener('keyup', (e: KeyboardEvent) => this.removePressed(e.code));
	}

	/**
	 * Adds a key to the list of pressed keys in the Pad's state.
	 */
	addPressed(key: string): void {
		this.setState({ pressedButtons: [...this.state.pressedButtons, key] });
		const btn = this.state.buttonProperties.flat().find(b => b.code === key);
		if (!btn || !btn.audio || !this.audio.sounds.has(btn.audio))
			return;
		switch (btn.type) {
			case 'standard': {
				this.audio.playSound(btn.audio, btn.volume, () => this.updateButtonProperties(btn.position, { active: false }));
				break;
			}
			case 'toggle': {
				if (btn.active)
					return this.audio.playing.get(btn.audio).stop();
				else
					this.audio.playSound(btn.audio, btn.volume, () => this.updateButtonProperties(btn.position, { active: false }));
				break;
			}
		}
		this.updateButtonProperties(btn.position, { active: true });
	}

	/**
	 * Removes a key from the list of pressed keys in the Pad's state.
	 */
	removePressed(key: string): void {
		const btn = this.state.buttonProperties.flat().find(btn => btn.code === key);
		this.setState({ pressedButtons: this.state.pressedButtons.filter(k => k !== key) });
		if (!btn)
			return;
		switch (btn.type) {
			case 'standard': {
				this.updateButtonProperties(btn.position, { active: false });
				break;
			}
		}
	}
	/**
	 * Selects a button to configurate.
	 * @param x The x position of the button.
	 * @param y The y position of the button.
	 */
	selectButton(coos: number[]): void {
		this.setState({ selectedButton: coos });
	}

	/**
	 * Sets the `freezed` property of state.
	 * @param freezed Whether to freeze the keys.
	 */
	setFreezed(freezed: boolean): void {
		this.setState({ freezed: freezed });
	}
	/**
	 * Updates the properties of a button.
	 * @param coos The position of the button to update the properties.
	 * @param properties The properties to update.
	 */
	updateButtonProperties(coos: number[], properties: Partial<ButtonProperties>): void {
		const updated = { ...this.state.buttonProperties[coos[0]][coos[1]], ...properties };
		if ('audio' in properties)
			this.audio.loadSound(properties.audio).then(success => this.updateButtonProperties(coos, { failing: !success }));
		const arr = this.state.buttonProperties;
		arr[coos[0]][coos[1]] = updated;
		this.setState({ buttonProperties: arr }, () => {
			localStorage.setItem('buttonProperties', JSON.stringify(this.state.buttonProperties));
		});
	}

	/**
	 * Generates a 2-dimensional array of default ButtonProperties.
	 */
	generateDefaultButtons(): ButtonProperties[][] {
		/**
		 * Default key codes for PadButtons in a 4x4 Pad.
		 */
		const defaultKeyCodes = [
			['Digit1', 'Digit2', 'Digit3', 'Digit4'],
			['KeyQ', 'KeyW', 'KeyE', 'KeyR'],
			['KeyA', 'KeyS', 'KeyD', 'KeyF'],
			['KeyZ', 'KeyX', 'KeyC', 'KeyV'],
		];
		const buttons: ButtonProperties[][] = [];
		const colors: string[] = ['#00a2ff', '#51ff3d', '#fa2570', '#b45de3'];
		let color;
		for (let i = 0; i < 4; i++) {
			buttons.push([]);
			color = i < 2 ? 0 : 2;
			for (let j = 0; j < 4; j++) {
				const plus = j < 2 ? 0 : 1;
				const btn: ButtonProperties = {
					active: PadButton.defaultProperties.active,
					activeColor: PadButton.defaultProperties.activeColor,
					flatColors: PadButton.defaultProperties.flatColors,
					idleColor: colors[color + plus],
					label: PadButton.defaultProperties.label,
					code: defaultKeyCodes[i][j],
					position: [i, j],
					type: PadButton.defaultProperties.type,
					volume: PadButton.defaultProperties.volume
				};
				buttons[i].push(btn);
			}
		}
		return buttons;
	}

	render(): React.ReactNode {
		const rows = [];
		for (let i = 0; i < this.props.rows; i++) {
			const cells = [];
			for (let j = 0; j < this.props.columns; j++) {
				const btn = this.state.buttonProperties[i][j];
				const props: PadButtonProps = {
					...btn,
					audioManager: this.audio,
					alt: this.state.pressedButtons.includes('AltRight'),
					freezed: this.state.freezed,
					select: (coos: number[]) => this.selectButton(coos)
				};
				const isSelected = this.state.selectedButton && this.state.selectedButton[0] === i && this.state.selectedButton[1] === j;
				cells.push(
					<PadButton
						{...props}
						className={(isSelected ? 'selected' : '') + (btn.failing ? ' failing' : '')}
						key={btn.code}
					/>
				);
			}
			rows.push(<div className='pad-button-row' key={`row-${i}`}>{cells}</div>);
		}
		let updater;
		if (this.state.selectedButton)
			updater = (p: Partial<ButtonProperties>) => this.updateButtonProperties(this.state.selectedButton as number[], p);
		let button;
		if (this.state.selectedButton) {
			const [y, x] = this.state.selectedButton;
			button = this.state.buttonProperties[y][x];
		}
		return (
			<>
				<div className={`pad ${this.state.selectedButton ? 'selection' : ''}`}>
					{rows}
				</div>
				<ButtonConfigurator
					updater={updater}
					button={button}
					setFreezed={(freezed: boolean) => this.setFreezed(freezed)}
				/>
			</>
		);
	}

	static defaultProps = {
		columns: 4,
		rows: 4
	};
}

export default Pad;
