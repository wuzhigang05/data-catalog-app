import { Breed } from './data';
import {
    Flex,
} from '@adobe/react-spectrum';
import BreedDetail from './breed_detail'

interface CompareProps {
    items: Breed[];
}


function Compare({ items }: CompareProps) {
    return <Flex columnGap={"size-1000"} margin="size-500">
        {items.map((item, index) => 
        <BreedDetail breed={item} shouldShowTitle={index === 0}></BreedDetail>)}
    </Flex>
}
export default Compare;
