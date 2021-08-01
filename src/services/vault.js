import CONSTANTS from '../constants/constants.js';

export class Vault {
	/**
	 * constructor for Vault service
	 * @param Logger
	 * @param year
	 */
	constructor(log, db) {
		this.logger = log;
		this.Db = db;
	}

	/**
	 * Create dweller by prompting questions
	 * @return {Promise<void>}
	 */
	async createDwellers(answers) {
		let obj = {
			'name': answers.name,
			'ic_no': answers.ic_no,
			'dob': answers.dob,
			'eye_color': answers.eye_color,
			'hair_color': answers.hair_color,
			'is_dead': false
		};
		try {
			await this.Db.writeSingleDweller(obj);//write dweller object to JSON file
		} catch (e) {
			this.logger.error(e.message);
		}
	}

	/**
	 * Get Dwellers by id
	 * @param ic_no
	 * @return {Promise<void>}
	 */
	async getDweller(ic_no) {
		try {
			let found = await this.Db.getById(ic_no);
			if(!found) {
				this.logger.info(CONSTANTS.MESSAGE.READ.NOT_FOUND_ERR);//Logs not found error if dweller not found
				return;
			}
			this.logger.log(found);
			return found;
		} catch (e) {
			this.logger.error(e);
		}
	}

	/**
	 * Search dwellers
	 * @param field
	 * @param op - supported 'equal_to','less_than','LIKE'
	 * @param value
	 */
	async search(field, op, value){
		let found = [];

		//call relevant function by operator
		switch (op) {
		case 'equal_to':
			found = await this.Db.searchEqualTo(field, value); //
			break;
		case 'less_than':
			found = await this.Db.searchLessThan(field, value);
			break;
		case 'like':
			found = await this.Db.searchSubstring(field, value);
			break;
		default:
			this.logger.log(CONSTANTS.MESSAGE.READ.INVALID_OPERATOR);
			break;
		}
		if (found.length > 0) {
			this.logger.log(found);
		} else {
			this.logger.info(CONSTANTS.MESSAGE.READ.NO_RESULTS);
		}
		return found;
	}

	/**
	 * set current year. this function should be used to forward the time
	 * @param year
	 * @return {Promise<void>}
	 */
	async writeCurrentYear(year) {
		try {
			await this.Db.writeCurrentYear(year);//move time forward
			this.logger.info('You are teleported to the future! Welcome to year ' + year);
		} catch (e) {
			this.logger.error(e.message);
		}
	}

}
