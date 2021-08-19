import React, { ChangeEventHandler } from 'react';
import '../style/ButtonConfigurator.sass';
import ButtonConfiguratorProps from '../types/ButtonConfiguratorProps';
import ButtonProperties from '../types/ButtonProperties';

class ButtonConfigurator extends React.Component<ButtonConfiguratorProps> {
	/**
	 * Refs to the inputs of the configurator.
	 */
	#refs: Record<string, React.RefObject<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
	/**
	 * The coos of the last selected button.
	 */
	lastSelectedPos?: number[]
	/**
	 * The event listener for every input of the configurator.
	 */
	onChange: ChangeEventHandler;

	constructor(props: ButtonConfiguratorProps) {
		super(props);
		this.#refs = {
			audio: React.createRef<HTMLInputElement>(),
			activeColor: React.createRef<HTMLInputElement>(),
			label: React.createRef<HTMLInputElement>(),
			idleColor: React.createRef<HTMLInputElement>(),
			type: React.createRef<HTMLSelectElement>(),
			volume: React.createRef<HTMLInputElement>()
		};
		this.onChange = (e) => {
			const changes: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
			const elm = e.target as HTMLInputElement;
			if (elm.type === 'file' && elm.files[0])
				changes[elm.name] = elm.files[0].path;
			else if (elm.type === 'range')
				changes[elm.name] = parseInt(elm.value) / 100;
			else
				changes[elm.name] = elm.value;
			if (this.props.updater)
				this.props.updater(changes);
		};
	}

	componentDidUpdate(): void {
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
				// We use == here to catch both null and undefined
				if (!ref.current || prop == null || ref.current.type === 'file')
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
				<div className='button-configurator idle'></div>
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
					<input type='color' ref={this.#refs.activeColor} onChange={this.onChange} name='activeColor' />
					<label htmlFor='activeColor'>Active color</label>
					<input type='color' ref={this.#refs.idleColor} name='idleColor' onChange={this.onChange} />
					<label htmlFor='idleColor'>Idle color</label>
				</div>
				<div className='button-configurator-subtitle'>Label</div>
				<input type='text' ref={this.#refs.label} name='label' onChange={this.onChange} />
				<div className='button-configurator-subtitle'>Audio</div>
				<input type='file' ref={this.#refs.audio} name='audio' accept='audio/*' onChange={this.onChange} />
				<input type='range' min='0' max='100' defaultValue='50' ref={this.#refs.volume} name='volume' onChange={this.onChange} />
				<div className='button-configurator-subtitle'>Type</div>
				<select ref={this.#refs.type} name='type' onChange={this.onChange}>
					<option value='standard'>Standard</option>
					<option value='toggle'>Toggle</option>
				</select>
			</div>
		);
	}
}

export default ButtonConfigurator;