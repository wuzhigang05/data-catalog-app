import React from 'react';
import { Breed } from './data';
import {
    Provider, defaultTheme, Button, ActionButton, DialogTrigger, Dialog, Heading,
    Divider, Content, ButtonGroup, Text, useListData, ListBox, Item, useAsyncList,
    Picker, TableView, TableBody, TableHeader, Image, Row, Column, Cell, Flex, View,
} from '@adobe/react-spectrum';

interface MyProps {
    item: Breed;
}


class DogCard extends React.Component<MyProps> {
    render() {
        let item = this.props.item;
        return <Flex direction="column">
            <Flex width="200px" height="200px">
                <Image src={item.image.url} alt={item.name} objectFit="fill"></Image>
            </Flex>
            <View><Heading level={4}>{item.name}</Heading></View>
        </Flex>;
    }
}

export default DogCard