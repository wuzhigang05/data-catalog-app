import React from 'react';
import {
    Image, Cell, Flex,
} from '@adobe/react-spectrum';

import { Breed, MyProps } from './data';

class CustomCell extends React.Component<MyProps>{

    render() {
        let item = this.props.item;
        let field = this.props.field;
        switch (field) {
            case "image":
                return <Cell>
                    <Flex width="40px" height="40px">
                        <Image src={item.image.url} alt={it.name} objectFit="cover" />
                    </Flex>
                </Cell>
            case "weight":
                return <Cell>{item.weight.metric}</Cell>
            case "height":
                return <Cell>{item.height.metric}</Cell>
            default:
                return <Cell>{item[field as keyof Breed]}</Cell>
        }
    }
}

export default CustomCell;