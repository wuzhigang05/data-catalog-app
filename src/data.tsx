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
  country_code: string;
  reference_image_id: string;
  image: DogImage;
  weight: MeasureSystem;
  height: MeasureSystem;
}

export const exposedBreedAttributes = [
  'image', 'name', 'bred_for', 'breed_group', 'life_span', 'temperament',
  'origin', 'weight', 'height'
]


export function getValueWithDefault(value?: string | number) {
  return (value == null || value === '') ? 'Not Available' : value
}

export const mockBreeds = [
  {
    "weight": {
      "imperial": "30 - 150",
      "metric": "14 - 68"
    },
    "height": {
      "imperial": "14 - 17",
      "metric": "36 - 43"
    },
    "id": 11,
    "name": "American Bully",
    "country_code": "US",
    "bred_for": "Family companion dog",
    "breed_group": "",
    "life_span": "8 – 15 years",
    "temperament": "Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous",
    "reference_image_id": "sqQJDtbpY",
    "image": {
      "id": "sqQJDtbpY",
      "width": 1024,
      "height": 683,
      "url": "https://cdn2.thedogapi.com/images/sqQJDtbpY.jpg"
    }
  },
  {
    "weight": {
      "imperial": "20 - 40",
      "metric": "9 - 18"
    },
    "height": {
      "imperial": "15 - 19",
      "metric": "38 - 48"
    },
    "id": 12,
    "name": "American Eskimo Dog",
    "country_code": "US",
    "bred_for": "Circus performer",
    "breed_group": "Non-Sporting",
    "life_span": "12 - 15 years",
    "temperament": "Friendly, Alert, Reserved, Intelligent, Protective",
    "reference_image_id": "Bymjyec4m",
    "image": {
      "id": "Bymjyec4m",
      "width": 1000,
      "height": 802,
      "url": "https://cdn2.thedogapi.com/images/Bymjyec4m.jpg"
    }
  },
]