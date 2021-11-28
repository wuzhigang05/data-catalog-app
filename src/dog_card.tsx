import React from 'react';
import { Breed } from './data';
import {
    Heading, Image, Flex, View,
} from '@adobe/react-spectrum';

interface DogCardProps {
    item: Breed;
}


class DogCard extends React.Component<DogCardProps> {

    render() {
        let item = this.props.item;
        return <Flex direction="column">
            <Flex width="200px" height="200px">
                <Image src={item.image.url} alt={item.name} objectFit="fill"></Image>
            </Flex>
            <Flex alignItems={'center'} columnGap='size-10'>
                <View><Heading level={4}>{item.name}</Heading></View>
            </Flex>
        </Flex>;
    }
}

export default DogCard