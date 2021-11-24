import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Provider, defaultTheme, Button, ActionButton, DialogTrigger, Dialog, Heading,
  Divider, Content, ButtonGroup, Text, useListData, ListBox, Item, useAsyncList,
  Picker, TableView, TableBody, TableHeader, Image, Row, Column, Cell, Flex, Header,
} from '@adobe/react-spectrum';

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

const URL_FEED_API = "https://api.thedogapi.com/v1/breeds";
const API_KEY_KEY = "x-api-key";
const API_KEY_SECRET = "540cc768-f717-4a7e-8ac1-ba5ccd8b9855";
// The thresh enforced by website. Requests with limit greater than this threshold will get 404.
const FETCH_THRESHOLD_VALUE = 10;
const FETCH_THRESHOLD_KEY = 'limit';
const PAGE_KEY = 'page';

function getUrlForNextPage(page: number) {
  let url = new URL(URL_FEED_API);
  url.searchParams.append(API_KEY_KEY, API_KEY_SECRET);
  url.searchParams.append(FETCH_THRESHOLD_KEY, FETCH_THRESHOLD_VALUE.toString());
  url.searchParams.append(PAGE_KEY, page.toString());
  return url;
}



function App() {
  // let list = useListData({
  //   initialItems: [{name: 'Aardvark'}, {name: 'Kangaroo'}, {name: 'Snake'}],
  //   initialSelectedKeys: ['Kangaroo'],
  //   getKey: (item) => item.name
  // });

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
    { name: 'ID', key: 'id' },
    { name: 'Image', key: 'image' },
    { name: 'Name', key: 'name' },
    { name: 'Bred for', key: 'bred_for' },
    { name: 'Breed group', key: 'breed_group' },
    { name: 'Life span', key: 'life_span' },
    { name: 'Temperament', key: 'temperament' },
    { name: 'Origin', key: 'origin' },
    // {name: 'Weight', key: 'weig'},
  ];

  // let list = useAsyncList<RowData>({
  //   async load({signal, cursor}) {
  //     if (cursor) {
  //       cursor = cursor.replace(/^http:\/\//i, 'https://');
  //     }

  //     let res = await fetch(cursor || `https://swapi.dev/api/people/?search=`, {
  //       signal
  //     });
  //     let json = await res.json();

  //     return {
  //       items: json.results,
  //       cursor: json.next
  //     };
  //   }
  // });

  // interface RowData {
  //   id: number;
  //   name: string;
  //   date: string;
  //   type: string;
  //   // height: string;
  //   // mass: string;
  //   // birthYear: string;
  // }

  // let rows: RowData[] = [
  //   { id: 1, name: 'Games', date: '6/7/2020', type: 'File folder' },
  //   { id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder' },
  //   { id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file' },
  //   { id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document' }
  // ];

  // function getCellValue(row: RowData, columnKey: React.Key): string | number {
  //   return row[columnKey as keyof RowData];
  // }
  function getCell(item: Breed, field: keyof Breed) {
    switch (field) {
      case "image":
        // return <Cell>{item.image.url}

        // </Cell>;
        return <Flex width="40px" height="40px">
          <Image src={item.image.url} alt={it.name} objectFit="cover" />
        </Flex>;
      case "weight":
        return <Cell>{item.weight.metric}</Cell>;
      case "height":
        return <Cell>{item.height.metric}</Cell>;
      default:
        return <Cell>{item[field as keyof Breed]}</Cell>;
    }
  }
  return (
    <Provider theme={defaultTheme}>
      <div className="heading">
        <Flex justifyContent="center"><Heading level={1}>Welcome to Dogs Home</Heading></Flex>
      </div>
      <div className="dogs-container">
        <Flex columnGap="size-1000" wrap>
          {list.items.map((item) => <DogCard item={item}></DogCard>)}
        </Flex>
      </div>
      {/* <TableView aria-label="example async loading table" height="size-6000"
        overflowMode="wrap">
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
      </TableView> */}
    </Provider>
  );
}

export default App;
