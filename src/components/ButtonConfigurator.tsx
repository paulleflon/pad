import React from 'react';
import '../style/ButtonConfigurator.sass';
import ButtonConfiguratorProps from '../types/ButtonConfiguratorProps';

class ButtonConfigurator extends React.Component<ButtonConfiguratorProps> {
	/**
	 * Refs to the inputs of the configurator.
	 */
	#refs: Record<string, React.RefObject<HTMLInputElement>>;
	/**
	 * The coos of the last selected button.
	 */
	lastSelectedPos?: number[]
	/**
	 * Whether each input has got its event listener.
	 */
	listening: Record<string, boolean>;

	constructor(props: ButtonConfiguratorProps) {
		super(props);
		this.#refs = {
			activeColor: React.createRef<HTMLInputElement>(),
			label: React.createRef<HTMLInputElement>(),
			restingColor: React.createRef<HTMLInputElement>()
		};
		this.listening = {
			activeColor: false,
			label: false,
			restColor: false
		};
	}

	componentDidUpdate(): void {
		// --Change events registering--
		// We run this at each update to make sure each ref has had its listener added.
		const onChange = (elm: HTMLInputElement) => {
			const changes: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
			if (elm.name.includes('.')) {
				const split = elm.name.split('.');
				changes[split[0]] = {};
				changes[split[0]][split[1]] = elm.value;
			} else {
				changes[elm.name] = elm.value;
			}
			if (this.props.updater)
				this.props.updater(changes);
		};
		for (const [name, ref] of Object.entries(this.#refs)) {
			if (!ref.current || this.listening[name])
				continue;
			this.listening[name] = true;
			ref.current.addEventListener('change', () => onChange(ref.current as HTMLInputElement));
			if (ref.current.type === 'text')
				ref.current.addEventListener('keyup', () => onChange(ref.current as HTMLInputElement));
		}
		// --Input values update--
		// This condition makes it so that the input values will update only if there is a button in the configurator's props,
		// and if it is the first button to be selected or if this selected button is different from the previous one.
		if (
			this.props.button
			&&
			(!this.lastSelectedPos
				|| (
					this.lastSelectedPos[0] !== this.props.button.position[0]
					|| this.lastSelectedPos[1] !== this.props.button.position[1]
				)
			)
		) {
			// Should find a way to automate this value updates instead of manually updating each of them.
			if (this.#refs.activeColor.current)
				this.#refs.activeColor.current.value = this.props.button.colors.active;
			if (this.#refs.restingColor.current)
				this.#refs.restingColor.current.value = this.props.button.colors.resting;
			if (this.#refs.label.current)
				this.#refs.label.current.value = this.props.button.label;
			this.lastSelectedPos = this.props.button.position;
		}
	}

	render(): React.ReactNode {
		if (!this.props.button) {
			return (
				<div className='button-configurator idle'>
					No button selected.
				</div>
			);
		}
		const btnName = `${this.props.button.position[0] + 1}:${this.props.button.position[1] + 1}`;
		return (
			<div className='button-configurator'>
				<div className='button-configurator-title'>
					Configuring button {btnName}
				</div>
				<div className='button-configurator-subtitle'>Colors</div>
				<div className='button-configurator-row'>
					<input type='color' ref={this.#refs.activeColor} name='colors.active' />
					<label htmlFor='colors.active'>Active  color</label>
					<input type='color' ref={this.#refs.restingColor} name='colors.resting' />
					<label htmlFor='colors.resting'>Resting color</label>
				</div>
				<div className='button-configurator-subtitle'>Label</div>
				<input type='text' ref={this.#refs.label} name='label' />
			</div>
		);
	}
}

export default ButtonConfigurator;