export default function cli(program, v, inquirer) {

	//get dwellers by passing ic_no
	program
		.command('get <ic>')
		.alias('g')
		.description('Get dwellers by id')
		.action((ic) => v.getDweller(ic));

	//search dwellers using '=', '<' or 'LIKE'
	program
		.command('search <field> <op> <value>')
		.alias('s')
		.description('Search Dwellers')
		.action((field, op, value) => v.search(field, op, value));

	//create dwellers
	program
		.command('create')
		.alias('c')
		.description('Get dwellers by id')
		.action(() => inquirer.prompt([
			{
				name : 'name',
				message: 'Name of the dweller?',
			},
			{
				name : 'dob',
				message: 'Birth year?'
			},
			{
				name : 'ic_no',
				message: 'ID card number?'
			},
			{
				name : 'hair_color',
				message: 'Hair colour?'
			},
			{
				name : 'eye_color',
				message: 'Eye colour?'
			},
			{
				type: 'list',
				name : 'gender',
				message: 'Gender?',
				choices: ['M', 'F']
			}
		]).then(answers => {
			v.createDwellers(answers);
		}));

	program
		.command('year <year>')
		.alias('c')
		.description('Get dwellers by id')
		.action((year) => v.writeCurrentYear(year));


	program.parse(process.argv);
}



