# Vault Management

## How to install

clone the project repository from GitHub. And then run

``npm install``

## How to Use the System

### Run Jasmine tests
`npm run test`

### Create Dweller

From the root directory run, 

``node src/index.js create``

### Get dweller by ID

``node src/index.js get 10``

### search dwellers

Searching support few functionalities. 
1. Search by partial string

    ``node src/index.js search name LIKE "Henry"``
2. Get dweller by id

    ``node src/index.js get 10``
3. Search by age less than

    ``node src/index.js search age less_than 30``
4. Search by fields 'equal_to', 'less_than', and 'like'

    ``node src/index.js search dob less_than 30``

    ``node src/index.js search eye_color equal_to blue``

    ``node src/index.js search hair_color equal_to grey``
5. Move time forward.
   
    dwellers age 70 will die setting `is_dead` status to true when moving time forward.

    `node src/index.js year 2030`

## Discussion
### Future work
- #### Expand the functionality of search
    Search functionalities are currently limited to ``equal_to``, `less_than` and `like`. It can be expanded to 
    support other operations as well such as `greater_than`, `age equal_to`

- #### Family Support - Children Feature

    currently, system does not support tracking family members. Feature can be achieved using introducing family id and 
    map dwellers to the family and introducing family_member_type field to the JSON

### Weaknesses 

#### validation

Following validation should be added to the `create` command. 

- Name input type validation(string)
- dob input type validation(integer)
- eye_color: input type validation(string)
- hair_color: input type validation(string)
- ic_no: input validation(is_unique)

    


