"use strict";

const bcrypt = require("bcryptjs");

function createPassword() {
  return bcrypt.hashSync("123456");
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      r({
        firstname: "4kst",
        lastname: "test",
        cpf: "00000000001",
        email: "4kst@test.com",
        phone: "(11) 99999-9999",
        andress: "Rua Teste",
        number: "123",
        complement: "A",
        neighborhood: "Bairro Teste",
        province: "Curitiba",
        state: "PR",
        country: "BR",
        zipCode: "12345-678",
        hashedPassword: createPassword(),
      }),
      r({
        firstname: "Jose",
        lastname: "Freire",
        cpf: "00000000002",
        email: "jose@example.com",
        phone: "(41) 99999-9999",
        andress: "Rua Teste",
        number: "124",
        complement: "B",
        neighborhood: "Bairro Teste 2",
        province: "Curitiba",
        state: "PR",
        country: "BR",
        zipCode: "23456-789",
        hashedPassword: createPassword(),
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users");
  },
};
