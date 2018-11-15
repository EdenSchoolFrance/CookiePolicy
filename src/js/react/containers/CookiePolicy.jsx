import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';

import Cookie from '../components/CookiePolicy';
import { cookiePolicyAccept } from '../../redux/actions/cookiePolicy';


class CookiePolicy extends Component {
	static propTypes = {
		cookies: 	  PropTypes.instanceOf(Cookies).isRequired,
		cookiePolicy: PropTypes.bool,
		maxAge:       PropTypes.number
	};

	componentWillMount() {
		this.init(this.props);
	}

	componentWillReceiveProps(props) {
		this.init(props);
	}

	init ({ cookiePolicy, cookies }) {
		if (!!cookiePolicy !== !!cookies.get('CookiePolicy')) {
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
		const { cookies, acceptCookies, maxAge = 315360000 } = this.props;

		cookies.set('CookiePolicy', '1', { path: '/', maxAge });

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
