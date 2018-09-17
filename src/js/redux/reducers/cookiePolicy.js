import {
	COOKIE_POLICY_ACCEPT,
} from '../actions/cookiePolicy';

export default (state = false, { type }) => {
	switch (type) {

		case COOKIE_POLICY_ACCEPT:
			return true;

		default:
			return state;
	}
}
