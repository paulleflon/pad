import React from 'react';
import '../style/ButtonConfigurator.sass';
import ButtonConfiguratorProps from '../types/ButtonConfiguratorProps';
import ButtonProperties from '../types/ButtonProperties';

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
	/**
	 * The event listener for every input of the configurator.
	 */
	onChange: (elm: HTMLInputElement) => void;

	constructor(props: ButtonConfiguratorProps) {
		super(props);
		this.#refs = {
			audio: React.createRef<HTMLInputElement>(),
			activeColor: React.createRef<HTMLInputElement>(),
			label: React.createRef<HTMLInputElement>(),
			idleColor: React.createRef<HTMLInputElement>(),
			volume: React.createRef<HTMLInputElement>()
		};
		this.listening = {
			audio: false,
			activeColor: false,
			label: false,
			restColor: false,
			volume: false
		};
		this.onChange = (elm: HTMLInputElement) => {
			const changes: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
			if (elm.type === 'file' && elm.files[0])
				changes[elm.name] = elm.files[0].path;
			else if (elm.type === 'range')
				changes[elm.name] = parseInt(elm.value) / 100;
			else if (elm.name.includes('.')) {
				const split = elm.name.split('.');
				changes[split[0]] = {};
				changes[split[0]][split[1]] = elm.value;
			} else {
				changes[elm.name] = elm.value;
			}
			if (this.props.updater)
				this.props.updater(changes);
		};
	}

	componentDidUpdate(): void {
		// --Change events registering--
		// We run this at each update to make sure each ref has had its listener added.
		for (const [name, ref] of Object.entries(this.#refs)) {
			if (!ref.current || this.listening[name])
				continue;
			this.listening[name] = true;
			const e = ref.current;
			ref.current.addEventListener('change', () => this.onChange(e));
			if (ref.current.type === 'text')
				ref.current.addEventListener('keyup', () => this.onChange(e));
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
			for (const [name, ref] of Object.entries(this.#refs)) {
				// The inputs' names are always a field name of ButtonProperties.
				const prop = this.props.button[name as keyof ButtonProperties];
				if (!ref.current || !prop || ref.current.type === 'file')
					continue;
				if (ref.current.type === 'range')
					ref.current.value = ((prop as number) * 100).toString();
				else
					ref.current.value = prop.toString();

			}
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
					<input type='color' ref={this.#refs.activeColor} name='activeColor' />
					<label htmlFor='activeColor'>Active color</label>
					<input type='color' ref={this.#refs.idleColor} name='idleColor' />
					<label htmlFor='idleColor'>Idle color</label>
				</div>
				<div className='button-configurator-subtitle'>Label</div>
				<input type='text' ref={this.#refs.label} name='label' />
				<div className='button-configurator-subtitle'>Audio</div>
				<input type='file' ref={this.#refs.audio} name='audio' accept='audio/*' />
				<input type='range' min='0' max='100' defaultValue='50' ref={this.#refs.volume} name='volume' />
			</div>
		);
	}
}

export default ButtonConfigurator;