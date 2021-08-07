import React from 'react';
import '../style/ButtonConfigurator.sass';
import ButtonConfiguratorProps from '../types/ButtonConfiguratorProps';

class ButtonConfigurator extends React.Component<ButtonConfiguratorProps> {
	/**
	 * Refs to the inputs of the configurator.
	 */
	#refs: Record<string, React.RefObject<HTMLInputElement>>;
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
		console.log('up');
		const onChange = (elm: HTMLInputElement) => {
			const changes: Record<string, any> = {};
			if (elm.name.includes('.')) {
				const split = elm.name.split('.');
				changes[split[0]] = {};
				changes[split[0]][split[1]] = elm.value;
			} else {
				changes[elm.name] = elm.value;
			}
			console.log('zebi');
			this.props.updater!(changes);
		};
		for (const [name, ref] of Object.entries(this.#refs)) {
			if (!ref.current || this.listening[name])
				continue;
			console.log(`${name} registered`);
			this.listening[name] = true;
			ref.current?.addEventListener('change', () => onChange(ref.current!));
			if (ref.current?.type === 'text')
				ref.current?.addEventListener('keyup', () => onChange(ref.current!));
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
					<input type='color' defaultValue={this.props.button.colors.active} ref={this.#refs.activeColor} name='colors.active' />
					<label htmlFor='colors.active'>Active  color</label>
				</div>
				<div className='button-configurator-row'>
					<input type='color' defaultValue={this.props.button.colors.resting} ref={this.#refs.restingColor} name='colors.resting' />
					<label htmlFor='colors.resting'>Resting color</label>
				</div>
				<div className='button-configurator-subtitle'>Label</div>
				<input type='text' ref={this.#refs.label} name='label' />
			</div>
		);
	}
}

export default ButtonConfigurator;