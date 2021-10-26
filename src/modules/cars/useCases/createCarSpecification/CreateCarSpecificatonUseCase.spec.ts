import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificatonUseCase } from "./CreateCarSpecificatonUseCase"

let createCarSpecificationUseCase: CreateCarSpecificatonUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificatonUseCase(carsRepositoryInMemory);

  })
  it("should be able to add a new specification to now-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"]
      await createCarSpecificationUseCase.execute({car_id, specifications_id})
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specifications_id = ["54321"]
    await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
  })
})