import { projectDatabase } from "../firebase/firebase";

const db = projectDatabase.ref("/employees");

const getAll = () => {
  return db;
};

const create = (employeeItem) => {
  return db.push(employeeItem);
};

const update = (employeeItem) => {
  return db.set(employeeItem);
};

export default {
  getAll,
  create,
  update,
};
