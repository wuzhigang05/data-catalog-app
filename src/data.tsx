// This file defines some interfaces and utility function used throughtout the project.

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
export class BreedAttributes {
  static image = 'image'
  static dogName = 'name'
  static bred_for = 'bred_for'
  static breed_group = 'breed_group'
  static life_span = 'life_span'
  static temperament = 'temperament'
  static origin = 'origin'
  static weight = 'weight'
  static height = 'height'
}

export const exposedBreedAttributes = [
  BreedAttributes.image, BreedAttributes.dogName, BreedAttributes.bred_for,
  BreedAttributes.breed_group, BreedAttributes.life_span, BreedAttributes.temperament,
  BreedAttributes.origin, BreedAttributes.weight, BreedAttributes.height
]

export const ExposedColumnsInTable = [
  BreedAttributes.dogName,
  BreedAttributes.bred_for,
  BreedAttributes.breed_group,
  BreedAttributes.life_span,
  BreedAttributes.temperament,
  BreedAttributes.origin,
].map((attribute) => {
  return { name: getDisplayNameForAttribute(attribute), key: attribute }
})

export function getDisplayNameForAttribute(attribute: string): string {
  switch (attribute) {
    case BreedAttributes.image:
      return 'Profile'
    case BreedAttributes.weight:
      return 'Weight'
    case BreedAttributes.height:
      return 'Height'
    case BreedAttributes.dogName:
      return 'Name'
    case BreedAttributes.bred_for:
      return 'Bred For'
    case BreedAttributes.breed_group:
      return 'Breed Group'
    case BreedAttributes.origin:
      return 'Origin'
    case BreedAttributes.temperament:
      return 'Temperament'
    case BreedAttributes.life_span:
      return 'Life Span'
    default:
      return 'Not Available'
  }
}

export function getValueFromItem(item: Breed, attribute: string) {
  switch (attribute) {
    case BreedAttributes.image:
      return item.image.url
    case BreedAttributes.weight:
      return getValueWithDefault(item.weight.metric)
    case BreedAttributes.height:
      return getValueWithDefault(item.height.metric)
    case BreedAttributes.dogName:
      return item.name
    case BreedAttributes.bred_for:
      return getValueWithDefault(item.bred_for)
    case BreedAttributes.breed_group:
      return getValueWithDefault(item.breed_group)
    case BreedAttributes.origin:
      return getValueWithDefault(item.origin)
    case BreedAttributes.temperament:
      return getValueWithDefault(item.temperament)
    case BreedAttributes.life_span:
      return getValueWithDefault(item.life_span)
    default:
      return 'Not Available'
  }
}

export function getValueWithDefault(value?: string | number) {
  return (value == null || value === '') ? 'Not Available' : value
}

// Used for testing.
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