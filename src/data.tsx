interface MeasureSystem {
  imperial: string;
  metric: string;
}

interface DogImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface Breed {
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: DogImage;
  weight: MeasureSystem;
  height: MeasureSystem;
}

export type MyProps = {
  field: string;
  item: Breed;
}