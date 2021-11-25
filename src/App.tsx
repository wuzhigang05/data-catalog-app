import React, { Key, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Provider, defaultTheme, Button, ActionButton, DialogTrigger, Dialog, Heading,
  Divider, Content, ButtonGroup, Text, useListData, ListBox, Item, useAsyncList,
  Picker, TableView, TableBody, TableHeader, Image, Row, Column, Cell, Flex, Header,
} from '@adobe/react-spectrum';

import {getUrlForNextPage} from './service';
import { Breed } from './data';

import CustomCell from './Custom_cell'
import DogCard from './dog_card';

interface RowData {
  name: string;
  height: string;
  mass: string;
  birthYear: string;
}

interface ColumnData {
  name: string;
  key: string;
}





function App() {

  let page: number = 0;
  let list = useAsyncList<Breed>({
    async load({ signal, cursor }) {
      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      let url = getUrlForNextPage(page)
      let res = await fetch(cursor || url.toString(), {
        signal
      });

      page += 1;
      let json = await res.json();
      return {
        items: json,
        cursor: getUrlForNextPage(page).toString()
      };
    }
  });

  let columns = [
    // { name: 'ID', key: 'id' },
    // { name: 'Image', key: 'image' },
    { name: 'Name', key: 'name' },
    { name: 'Bred for', key: 'bred_for' },
    { name: 'Breed group', key: 'breed_group' },
    { name: 'Life span', key: 'life_span' },
    { name: 'Temperament', key: 'temperament' },
    { name: 'Origin', key: 'origin' },
    // {name: 'Weight', key: 'weig'},
  ];

  function getCell(item: Breed, field: keyof Breed) {
    switch (field) {
      case "name":
        return <Cell>
          <Flex columnGap="size-50">
            <Flex width="40px" height="40px">
              <Image src={item.image.url} alt={item.name} objectFit="cover" />
            </Flex><Heading level={5}>{item.name}</Heading></Flex></Cell>;
      case "weight":
        return <Cell>{item.weight.metric}</Cell>;
      case "height":
        return <Cell>{item.height.metric}</Cell>;
      default:
        return <Cell>{item[field as keyof Breed]}</Cell>;
    }
  }

  // Spent lots of time trying to resolve a compilation error. Need to add
  // <'all' | Iterable<Key>> to useState.
  let [selectedKeys, setSelectedKeys] = React.useState<'all' | Iterable<Key>>(new Set([]));

  return (
    <Provider theme={defaultTheme}>
      <div className="heading">
        <Flex justifyContent="center"><Heading level={1}>Welcome to Dogs Home</Heading></Flex>
      </div>
      <div className="dogs-container">
        <ActionButton alignSelf="start" 
        isDisabled={selectedKeys != 'all' && (selectedKeys as Set<Key>).size <= 1}>
          Compare
          </ActionButton>
        <TableView aria-label="example async loading table" height="size-6000"
          overflowMode="wrap"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}>
          <TableHeader columns={columns}>
            {(column) => (
              <Column align={column.key !== 'name' ? 'end' : 'start'}>
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody
            items={list.items}
            loadingState={list.loadingState}
            onLoadMore={list.loadMore}>
            {(item) => (
              <Row key={item.name}>{(key) => getCell(item, key as keyof Breed)}
              </Row>
            )}
          </TableBody>
        </TableView>
      </div>
    </Provider>
  );
}

export default App;
