import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      fine_amount,
      daily_rate,
      category_id,
      license_plate,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    await createCarUseCase.execute({
      name,
      description,
      brand,
      fine_amount,
      daily_rate,
      category_id,
      license_plate,
    });

    return response.status(201).send();
  }
}

export { CreateCarController };
