import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  list(): Promise<CarImage[]>;
}

export { ICarsImagesRepository }