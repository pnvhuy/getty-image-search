import React from "react";

class Thumb extends React.Component {
	handleClick() {
		this.props.clickHandler(this.props.image);
	}

	render() {
		//check that image exists
		if (
			this.props.image.display_sizes &&
			this.props.image.display_sizes.length &&
			this.props.image.display_sizes[0].uri
		) {
			return (
				<div className="img-holder" onClick={() => this.handleClick()}>
					<img
						src={this.props.image.display_sizes[2].uri}
						alt={this.props.image.title}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Thumb;
