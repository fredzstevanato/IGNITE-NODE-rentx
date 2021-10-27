import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  })

  it("shoud be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "121212", 
      user_id: "123456", 
      expected_return_date: new Date()
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("shoud be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "121212", 
        user_id: "123456", 
        expected_return_date: new Date()
      });
  
      const rental = await createRentalUseCase.execute({
        car_id: "121212", 
        user_id: "123456", 
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("shoud be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "121212", 
        user_id: "123456", 
        expected_return_date: new Date()
      });
  
      const rental = await createRentalUseCase.execute({
        car_id: "121212", 
        user_id: "654321", 
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError)
  })
})