import { Low, JSONFile } from 'lowdb';
import CONSTANTS from '../constants/constants.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = 'dwellers.json';
const file = __dirname + '/' + dbFile;

const adapter = new JSONFile(file);
const db = new Low(adapter);

export class Db {

	constructor() {
		this.readDb();
	}
	/**
	 * Read From JSON file and store in memory
	 * @return {Promise<void>}
	 */
	async readDb() {
		await db.read();
		if (db && !db.data) {
			db.data = { dwellers: [] };
		}
	}

	/**
	 * write dweller object to the database
	 * @param data
	 * @param field - property of JSON object
	 */
	async writeSingleDweller(data) {
		let aliveMembers = this.getAliveMembers(db.data.dwellers);
		console.log(aliveMembers.length);
		if(aliveMembers.length <= CONSTANTS.CONSTRAINS.MAX_DWELLERS) {
			db.data.dwellers.push(data);
			await this.commitDb();
			return true;
		}
		throw new Error('Sorry! Vault is full!');
	}

	/**
	 * set current year and persist
	 * @param year
	 * @return {Promise<boolean>}
	 */
	async writeCurrentYear(year) {
		if (db.data.current_year < year) {
			let updatedDwellers = await this.dieDwellers(year);//get is_dead property updated dwellers list
			db.data = {dwellers : updatedDwellers, current_year : year};// set modified year and objects to db.data to prepare to commit
			await this.commitDb();// save to DB file
		} else {
			throw new Error('Current time is higher than the provided year!');
		}
	}

	/**
	 * set dead dwellers is_dead status to true :'(
	 * @param currentYear
	 * @return {Promise<void>}
	 */
	async dieDwellers(currentYear) {
		let dwellers = db.data.dwellers;
		dwellers.map(obj =>  {
			if ((currentYear - obj['dob']) >= 70) {
				obj.is_dead = true;
			}
		});
		return dwellers;
	}
	/**
	 * persist data to JSON object
	 * @return {Promise<void>}
	 */
	async commitDb() {
		return await db.write();
	}

	/**
	 * Get Dwellers by ID
	 * @param ic_no
	 * @return {Promise<void>}
	 */
	async getById(ic_no) {
		let dwellers = db.data.dwellers;
		if (typeof dwellers == 'object') {
			return dwellers.find(obj => obj.ic_no == ic_no);
		}
		return false;
	}

	/**
	 * Search object equals to a value
	 * @param field
	 * @param value
	 * @return {Promise<boolean|*>}
	 */
	async searchEqualTo(field, value) {
		let dwellers = db.data.dwellers;
		try {
			return dwellers.filter(obj => obj[field] == value);//return dwellers found for search parameters
		} catch (e) {
			return false;
		}
	}

	/**
	 * search for object less than the value
	 * @param field
	 * @param value
	 * @return {Promise<*>}
	 */
	async searchLessThan(field, value) {
		let dwellers = db.data.dwellers;
		try {
			if (field === 'age') {
				if (value > 70) {
					throw new Error(CONSTANTS.MESSAGE.READ.INVALID_AGE);//throw error passed age is greater than 70.
				}
				let currentYear = db.data.current_year;
				return dwellers.filter(obj => (currentYear - obj['dob']) < value);//return age less_than search data
			}
			return dwellers.filter(obj => obj[field] < value);//return less_than search data
		} catch (e) {
			return false;
		}
	}

	/**
	 * search substring
	 * @param field
	 * @param value
	 * @return {Promise<*>}
	 */
	async searchSubstring(field, value) {
		let dwellers = db.data.dwellers;
		try {
			return dwellers.filter(obj => obj[field].includes(value));//search by partial string
		} catch (e) {
			return false;
		}
	}

	/**
	 * Get Alive members
	 * @param dwellers
	 * @return {boolean|*}
	 */
	getAliveMembers(dwellers) {
		try{
			return dwellers.filter(obj => obj['is_dead'] === false);
		} catch (e) {
			return false;
		}
	}
}