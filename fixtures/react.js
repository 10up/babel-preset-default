import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types'; // eslint-disable-line

const Component = ({ title, url, description }) => (
	<div className="component-test-babel">
		<a href={url} title={title}>
			<h1>{title}</h1>
		</a>
		<p>{description}</p>
	</div>
);

Component.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
	description: PropTypes.string,
};

Component.defaultProps = {
	title: '',
	url: '',
	description: '',
};

class ClassComponent extends React.Component {
	componentDidMount() {
		// doing something
	}

	render() {
		const { title } = this.props;
		return (
			<div className="Class Component">
				<h1>{title}</h1>
			</div>
		);
	}
}

ClassComponent.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Component;
