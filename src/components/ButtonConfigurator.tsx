import React from 'react';
import ButtonConfiguratorProps from '../types/ButtonConfiguratorProps';

class ButtonConfigurator extends React.Component<ButtonConfiguratorProps> {
	/**
	 * Refs to the inputs of the configurator.
	 */
	#refs: Record<string, React.RefObject<HTMLInputElement>>;

	constructor(props: ButtonConfiguratorProps) {
		super(props);
		this.#refs = {
			activeColor: React.createRef<HTMLInputElement>(),
			label: React.createRef<HTMLInputElement>(),
			restColor: React.createRef<HTMLInputElement>()
		};
	}

	componentDidMount(): void {
		const onChange = (elm: HTMLInputElement) => {
			const changes: Record<string, any> = {};
			if (elm.name.includes('.')) {
				const split = elm.name.split('.');
				changes[split[0]] = {};
				changes[split[0]][split[1]] = elm.value;
			} else {
				changes[elm.name] = elm.value;
			}
			this.props.updater!(changes);
		};
		for (const ref of Object.values(this.#refs)) {
			ref.current?.addEventListener('change', () => onChange(ref.current!));
			if (ref.current?.type === 'text')
				ref.current?.addEventListener('keyup', () => onChange(ref.current!));
		}
	}

	render(): React.ReactNode {
		return (
			<div className='button-configurator'>
				<input type='color' defaultValue={this.props.button?.colors.active} ref={this.#refs.activeColor} name='colors.active' />
				<input type='color' ref={this.#refs.restColor} defaultValue={this.props.button?.colors.resting} name='colors.resting' />
				<input type='text' ref={this.#refs.label} name='label' />
			</div>
		);
	}
}

export default ButtonConfigurator;