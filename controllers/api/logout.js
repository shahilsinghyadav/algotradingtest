
const logout = async (req, res) => {
    try {
        const smart_api = req.session.smart_api;

        // Ensure smart_api instance exists in session
        if (!smart_api) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
        smart_api.setSessionExpiryHook(customSessionHook);

        function customSessionHook() {
            console.log('User loggedout');
        }
        req.session.destroy();

        // Send response back to client
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports=logout;

