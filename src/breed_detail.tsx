
import { Breed } from './data';
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
    return <Text  width={"size-2000"}><div className="detail-title">{text}</div> </Text>
}

// interface DetailCellProps {
//     title: string
//     shouldShowTitle: boolean
//     children: JSX.Element
// }

// function DetailCell({title, shouldShowTitle, children}: DetailCellProps) {
//     return <Flex columnGap="size-500" alignItems={"center"} height="size-500">
//         {shouldShowTitle ? <CustomTitle text={title}></CustomTitle> : null}
//         {children}
//     </Flex>
// }

function BreedDetail({ breed, shouldShowTitle }: BreedDetailProps) {

    return <Flex direction="column" rowGap="size-500">
        <Flex columnGap="size-500" alignItems={"center"}>
            {shouldShowTitle ? <CustomTitle text={'Name'}></CustomTitle> : null}
            <DogCard item={breed}></DogCard>
        </Flex>
        <Flex columnGap="size-500" alignItems={"center"} height="size-500">
            {shouldShowTitle ? <CustomTitle text={'Breed Group'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.breed_group}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"} height="size-500">
            {shouldShowTitle ? <CustomTitle text={'Bred For'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.bred_for}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"} height="size-500">
            {shouldShowTitle ? <CustomTitle text={'Life Span'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.life_span}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"center"} height="size-500">
            {shouldShowTitle ? <CustomTitle text={'Origin'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.origin}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"} height="size-1000">
            {shouldShowTitle ? <CustomTitle text={'Temperament'}></CustomTitle> : null}
            <View height={"size-400"} width={"size-3000"}>{breed.temperament}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"}>
            {shouldShowTitle ? <CustomTitle text={'Weight (Metric)'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.weight.metric}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"}>
            {shouldShowTitle ? <CustomTitle text={'Weight (Imperial)'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.weight.imperial}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"}>
            {shouldShowTitle ? <CustomTitle text={'Height (Metric)'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.height.metric}</View>
        </Flex>
        <Flex columnGap="size-500" alignItems={"start"}>
            {shouldShowTitle ? <CustomTitle text={'Height (Imperial)'}></CustomTitle> : null}
            <View height={"size-400"}>{breed.height.imperial}</View>
        </Flex>
    </Flex>
}

export default BreedDetail