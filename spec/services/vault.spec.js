import {Vault} from '../../src/services/vault.js'
import {Db} from '../../src/storage/db.js';
import Logger from '../../src/services/logger.js';

const logger = new Logger(); //instantiate logger service

const db = new Db();//Instantiate in-memory DB
await db.readDb(); //Read data from DB

const v = new Vault(logger, db);//Instantiate Vault service.

describe("Vault service", function () {
    it("Get dwellers by id", async function () {
        expect(await v.getDweller(10)).toEqual({
                name: 'Lou House',
                ic_no: 10,
                dob: 1950,
                eye_color: 'blue',
                hair_color: 'brown',
                gender: 'F',
                is_dead: true
            }
        );
    });

    it("Search dwellers : age less than 30", async function () {
        expect(await v.search('age', 'less_than', 30)).toEqual([{
            name: 'Glover Melendez',
            ic_no: 4,
            dob: 2003,
            eye_color: 'blue',
            hair_color: 'brown',
            gender: 'F',
            is_dead: false
        },{
            name: 'Helena Wolfe',
            ic_no: 8,
            dob: 2005,
            eye_color: 'green',
            hair_color: 'grey',
            gender: 'M',
            is_dead: false
        }]);
    });

    it("Search dwellers : hair_color equal_to green", async function () {
        expect(await v.search('hair_color', 'equal_to', 'green')).toEqual([
            {
                name: 'Manuela Guy',
                ic_no: 9,
                dob: 1955,
                eye_color: 'brown',
                hair_color: 'green',
                gender: 'M',
                is_dead: true
            },
            {
                name: 'Jane brad',
                ic_no: '412',
                dob: '1992',
                eye_color: 'black',
                hair_color: 'green',
                gender: 'F',
                is_dead: false
            },
            {
                name: 'Dogm freddy',
                ic_no: '415',
                dob: '1970',
                eye_color: 'red',
                hair_color: 'green',
                is_dead: false
            },
            {
                name: 'Freddy',
                ic_no: '460',
                dob: '1956',
                eye_color: 'red',
                hair_color: 'green',
                is_dead: true
            }
        ]);
    });

    it("Search dwellers : name contains substring Dogm", async function () {
        expect(await v.search('name', 'like', 'Dogm')).toEqual([
                {
                    name: 'Dogm freddy',
                    ic_no: '415',
                    dob: '1970',
                    eye_color: 'red',
                    hair_color: 'green',
                    is_dead: false
                }
            ]
        );
    });
});

