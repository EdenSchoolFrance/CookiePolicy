import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";

class CookiePolicy extends Component{
	static propTypes = {
		accepted: PropTypes.boolean,
		accept:   PropTypes.function
	};

	static defaultProps = {
		cookiePolicy: false,
		accept: () => undefined,
		children: "En poursuivant votre navigation sur ce site vous acceptez l’utilisation de cookies pour améliorer votre expérience utilisateur. En savoir plus pour gérer les paramètres de ce site"
	}

  	state = {
    	closed: false
  	}

  	componentWillMount() {
    	this.init(this.props);
  	}

  	componentWillReceiveProps(props) {
    	this.init(props);
  	}

	init ({ accepted, accept }) {
    	if (!!accepted) {
      	    this.close();
    	}
  	}

	close(accepted){
		const { accept } = this.props;

		if (accepted) {
			accept();
		}

		this.setState({ closed: true });
	}

  	render(){
		const { className, children, ...props } = this.props;
    	const { closed } = this.state;

    	if (closed) {
      		return null;
    	}

    	return(
      		<div {...props} className={cx("cookie", className)}>
        		<p>{ children }</p>
        		<div>
          			<button onClick={() => this.close(true)}>Continuer</button>
        		</div>
      		</div>
    	);
  	}
}

export default CookiePolicy;
