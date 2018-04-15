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
		let textResult = null;

		if (this.props.search.attempted) {
			if (this.props.search.phrase) {
				textResult = (
					<p>
						Search results for <u>{this.props.search.phrase}</u>
					</p>
				);
			} else {
				textResult = <p>Could not find any matches</p>;
			}
		}

		return (
			<div>
				<input
					type="text"
					placeholder="Search"
					onChange={e => this.handleChange(e)}
				/>
				<button className="button" onClick={() => this.handleClick()}>
					Go!
				</button>

				{textResult}
			</div>
		);
	}
}

export default Search;
