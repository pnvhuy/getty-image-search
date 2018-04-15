import React from "react";

class Modal extends React.Component {
	handleClick() {
		this.props.clickHandler();
	}

	render() {
		//check that image exists
		if (
			this.props.image && 
			this.props.image.display_sizes &&
			this.props.image.display_sizes.length &&
			this.props.image.display_sizes[1].uri
		) {
			return (
				<div
					className="modal"
					onClick={() => this.handleClick()}
					style={
						this.props.show
							? { display: "block" }
							: { display: "none" }
					}
				>
					<img
						src={this.props.image.display_sizes[1].uri}
						alt={this.props.image.title}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Modal;
