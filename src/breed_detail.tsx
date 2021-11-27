
import { Breed, BreedAttributes, exposedBreedAttributes, getDisplayNameForAttribute, getValueFromItem} from './data';
import {
    Flex, View, Text,
} from '@adobe/react-spectrum';
import DogCard from './dog_card'

interface BreedDetailProps {
    breed: Breed
    // Whether or not show a title for each piece of data. 
    shouldShowTitle: boolean
}
interface CustomTitleProps {
    text: string
}

function CustomTitle({ text }: CustomTitleProps) {
    return <Text width={"size-2000"} height="size-1000"><div className="detail-title">{text}</div> </Text>
}

function BreedDetail({ breed, shouldShowTitle }: BreedDetailProps) {

    return <Flex direction="column" >
        {exposedBreedAttributes.filter(attribute => attribute !== 'name').map((attribute) => {
            switch (attribute) {
                case 'image':
                    return (
                        <Flex columnGap="size-300" alignItems={"center"} height="size-8000">
                            {shouldShowTitle ? <CustomTitle text={getDisplayNameForAttribute(BreedAttributes.dogName)}></CustomTitle> : null}
                            <DogCard item={breed}></DogCard>
                        </Flex>)
                default:
                    return (
                        <Flex columnGap="size-300" alignItems={"center"} height="size-1000">
                            {shouldShowTitle ? <CustomTitle text={getDisplayNameForAttribute(attribute)}></CustomTitle> : null}
                            <View height="size-1000" width="size-3000">{getValueFromItem(breed, attribute)}</View>
                        </Flex>)
            }
        })}
    </Flex>
}

export default BreedDetail