import React from "react";

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "hello"
		};
	}

	handleChange(e) {
		this.setState({ input: e.target.value });
	}

	handleClick() {
		this.props.clickHandler(this.state.input);
	}

	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Search"
					onChange={(e) => this.handleChange(e)}
				/>
				<button class="button" onClick={() => this.handleClick()}>Go!</button>
			</div>
		);
	}
}

export default Search;
