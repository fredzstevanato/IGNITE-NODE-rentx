import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new Car", async () => {
    const user = await createUserUseCase.execute({
      driver_license: "123456",
      email: "test@rentx.com.br",
      name: "John Doe",
      password: "5207",
    });

    expect(user).toHaveProperty("id");
  });
});
