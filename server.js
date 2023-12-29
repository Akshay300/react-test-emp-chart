const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

function getRandomName() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

//generating random 1000+ employee data in hierarchical nature
function generateEmployee(parentEmail, level) {
  const name = getRandomName();
  const email = `${name.toLowerCase()}@example.com`;
  return {
    email,
    name,
    reporting_manager: parentEmail || null,
    designation:
      level === 1
        ? "CEO"
        : level === 2
        ? "Manager"
        : level === 3
        ? "Lead"
        : level === 4
        ? "Engineer"
        : "Junior Engineer",
    subordinates: [],
  };
}

function generateOrgTree(
  numCEOs,
  numManagers,
  numLeads,
  numEngineers,
  numJuniorEngineers
) {
  const orgTree = [];

  // CEO level
  for (let i = 0; i < numCEOs; i++) {
    const ceo = generateEmployee(null, 1);
    orgTree.push(ceo);

    // Manager level
    for (let j = 0; j < numManagers; j++) {
      const manager = generateEmployee(ceo.email, 2);
      ceo.subordinates.push(manager);

      // Lead level
      for (let k = 0; k < numLeads; k++) {
        const lead = generateEmployee(manager.email, 3);
        manager.subordinates.push(lead);

        // Engineer level
        for (let l = 0; l < numEngineers; l++) {
          const engineer = generateEmployee(lead.email, 4);
          lead.subordinates.push(engineer);

          // Junior Engineer level
          for (let m = 0; m < numJuniorEngineers; m++) {
            const juniorEngineer = generateEmployee(engineer.email, 5);
            engineer.subordinates.push(juniorEngineer);
          }
        }
      }
    }
  }

  return orgTree;
}

const numCEOs = 1;
const numManagers = 5;
const numLeads = 5;
const numEngineers = 5;
const numJuniorEngineers = 6;

const employees = generateOrgTree(
  numCEOs,
  numManagers,
  numLeads,
  numEngineers,
  numJuniorEngineers
);

app.get("/api/employeesdata", (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//This function is created to build hierarchical data from provided json format.
//but provided json data was not linked to create hierarchical data.
// function buildTree(employees) {
//   const employeeMap = new Map();

//   // Create a map to efficiently look up employees by their email
//   employees.forEach(employee => {
//     employee.subordinates = [];
//     employeeMap.set(employee.email, employee);
//   });

//   // Build the tree structure
//   const rootEmployees = [];
//   employees.forEach(employee => {
//     if (employee.reporting_manager) {
//       const manager = employeeMap.get(employee.reporting_manager);
//       if (manager) {
//         manager.subordinates.push(employee);
//       }
//     } else {
//       rootEmployees.push(employee);
//     }
//   });

//   return rootEmployees;
// }

// // Example data for 10 employees
// const employees = [
//   {
//     "name": "Adam Miller",
//     "email": "adam@example.com",
//     "designation": "CEO",
//     "reporting_manager": null
//   },
//   {
//     "name": "John Doe",
//     "email": "john@example.com",
//     "designation": "Manager",
//     "reporting_manager": "adam@example.com"
//   },
//   {
//     "name": "Jane Doe",
//     "email": "jane@example.com",
//     "designation": "Manager",
//     "reporting_manager": "adam@example.com"
//   },
//   {
//     "name": "Alice Johnson",
//     "email": "alice@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "john@example.com"
//   },
//   {
//     "name": "Bob Smith",
//     "email": "bob@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "john@example.com"
//   },
//   {
//     "name": "Charlie Brown",
//     "email": "charlie@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "john@example.com"
//   },
//   {
//     "name": "Eva Green",
//     "email": "eva@example.com",
//     "designation": "Manager",
//     "reporting_manager": "jane@example.com"
//   },
//   {
//     "name": "David White",
//     "email": "david@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "eva@example.com"
//   },
//   {
//     "name": "Frank Black",
//     "email": "frank@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "eva@example.com"
//   },
//   {
//     "name": "Grace Taylor",
//     "email": "grace@example.com",
//     "designation": "Engineer",
//     "reporting_manager": "eva@example.com"
//   }
// ];

// // Build the organization tree
// const organizationTree = buildTree(employees);

// // Output the organization tree
// console.log(JSON.stringify(organizationTree, null, 2));