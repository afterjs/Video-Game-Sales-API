const NodeCache = require("node-cache");
const Roles = require("../models/roles");
const rolesMap = new Map();

const loadRolesId = async () => {
 
  //select role where name = 'admin'
  const adminRole = await Roles.findOne({
    where: {
      name: "admin",
    }
  });

  const viewRole = await Roles.findOne({
    where: {
      name: "view",
    }
  });

  const editRole = await Roles.findOne({
    where: {
      name: "edit",
    }
  });



  rolesMap.set("adminId", adminRole.dataValues.id);
  rolesMap.set("viewId", viewRole.dataValues.id);
  rolesMap.set("editId", editRole.dataValues.id);


  console.log(rolesMap)

  return true;
};

let getRoleId = (key) => {
  return rolesMap.get(key);
};

module.exports = { loadRolesId, getRoleId };
