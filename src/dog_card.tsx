import React, { useState }  from 'react';
import { Breed } from './data';
import {
    Provider, defaultTheme, Button, ActionButton, DialogTrigger, Dialog, Heading,
    Divider, Content, ButtonGroup, Text, useListData, ListBox, Item, useAsyncList,
    Picker, TableView, TableBody, TableHeader, Checkbox, Image, Row, Column, Cell, Flex, View,
} from '@adobe/react-spectrum';

interface DogCardProps {
    item: Breed;
}

interface DogCardState {
    selected: boolean;
}

class DogCard extends React.Component<DogCardProps, DogCardState> {
    state: DogCardState = {selected: false};
    

    render() {
        let item = this.props.item;
        return <Flex direction="column">
            <Flex width="200px" height="200px">
                <Image src={item.image.url} alt={item.name} objectFit="fill"></Image>
            </Flex>
            <Flex alignItems={'center'} columnGap='size-10'>
                <Checkbox isSelected={this.state.selected}></Checkbox>
            <View><Heading level={4} maxWidth="148px">{item.name}</Heading></View></Flex>
        </Flex>;
    }
}

export default DogCard