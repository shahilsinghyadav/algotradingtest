
// TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
smart_api.setSessionExpiryHook(customSessionHook);

function customSessionHook() {
	console.log('User loggedout');
}

