import React from "react";

class Thumb extends React.Component {
	handleClick() {
		this.props.clickHandler(this.props.sizes[1].uri);
	}

	render() {
		return (
			<div className="img-holder" onClick={() => this.handleClick()}>
				<img src={this.props.sizes[2].uri} />
			</div>
		);
	}
}

export default Thumb;
