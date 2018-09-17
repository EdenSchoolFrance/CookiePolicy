import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Cookie from '../components/CookiePolicy';
import { cookiePolicyAccept } from '../../actions/CookiePolicy';


class CookiePolicy extends Component {
	static propTypes = {
		cookies: 	  PropTypes.instanceOf(Cookies).isRequired,
		cookiePolicy: PropTypes.boolean
	};

	componentWillMount() {
		this.init(this.props);
	}

	componentWillReceiveProps(props) {
		this.init(props);
	}

	init ({ cookiePolicy, cookies }) {
		if (!!cookiePolicy !== !!cookies.has('CookiePolicy')) {
			this.acceptCookies();
		}
	}

	render() {
		const { cookiePolicy, children, acceptCookies, ...props } = this.props;

		return (
			<Cookie {...props} accepted={cookiePolicy} accept={this.acceptCookies}>
				{ children }
			</Cookie>
		);
	}

	acceptCookies = () => {
		const { cookies, acceptCookies } = this.props;

		cookies.set('CookiePolicy', '1', { path: '/' });

		acceptCookies();
	}
}

function mapStateToProps({ cookiePolicy }) {
	return {
		cookiePolicy
	};
}

function mapDispatchToProps (dispatch) {
	return {
		acceptCookies: () => dispatch(cookiePolicyAccept())
	}
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(CookiePolicy));
