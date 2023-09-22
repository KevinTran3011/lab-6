const Sequelize = require('sequelize');
const db = require('./connect_db');

const Companies = db.define('companies', {
  name: Sequelize.STRING,
  profit: Sequelize.FLOAT
});

const Employees = db.define('employees', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

Employees.belongsTo(Companies);
Companies.hasMany(Employees);

// Q1: Finds one of the employees (any one) and prints out the company that
// he/she works for. Note the use of the include option to retrieve the company
// associated with each employee. This will result in a join.
Employees.findOne({ include: [Companies] }).then(employee => {
  console.log(employee.name + ' works at ' + employee.company.name);
})

// Q2: Creates a new company and makes the employee with id 1 its employee.
.then(() => Companies.create({
  name: 'Dell',
  profit: 10.0
}))
.then(c => {
  return Employees.findByPk(1).then(e => e.update({companyId: c.id}));
})
.then(() => {
  // Q3: Shows that the companyId attribute for employee with id 1 has been updated
  return Employees.findByPk(1).then(employee => {
    console.log(employee.dataValues);
  });
})

// Q4: Sorts all employees oldest-to-youngest and prints their details.
.then(() => Employees.findAll({ order: [['age', 'DESC']] }))
.then(employees => {
  employees.forEach(employee => {
    console.log(employee.dataValues);
  });
})

// Exercise 3
// *** TODO: Insert code here ***

.then(()=>Employees.findOne({
  where: {
    name: 'Peter Rabbit',
   
  },
  include: [Companies],
}))
.then(employee => {console.log(employee.company.dataValues)})

// Exercise 4
// *** TODO: Insert code here ***

.then(() => Companies.findOne({
  order: 
   [ ['profit', 'DESC']] ,
  include: [Employees],

}))
.then(company => company.employees.forEach(
  employee =>{
    console.log(employee.dataValues)
    
  },
  console.log()

))

// Exercise 5
// *** TODO: Insert code here ***  

.then(()=> Companies.findByPk(1).then(
  company =>{
    console.log('New employee added to :' + company.id);
    const newEmployee = Employees.create({
      name: 'Kevin Kaslana',
      age: 19,
      companyId: company.id,
    }


    )
    return newEmployee;},



))

.catch(console.error).then(() => db.close());
