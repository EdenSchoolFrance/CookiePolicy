const DOMAIN = "CookiePolicy";

export const COOKIE_POLICY_ACCEPT = `${DOMAIN}/Accept`;

export function cookiePolicyAccept () {
	return {
		type: COOKIE_POLICY_ACCEPT
	}
}
