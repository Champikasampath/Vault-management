export default class Logger {
	/**
     * Display Error message
     * @param message
     */
	error(message) {
		console.error(message);
	}

	/**
     * Display information (eg: success, executing)
     * @param message
     */
	info(message) {
		console.info(message);
	}

	/**
     * Display outputs
     * @param data
     */
	log(data) {
		console.log(data);
	}
}