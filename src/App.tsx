import React, { Key } from 'react';
import './App.css';
import {
  Provider, defaultTheme, ActionButton, DialogTrigger, Dialog, Heading,
  useAsyncList, Button, ButtonGroup,
  TableView, TableBody, TableHeader, Image, Row, Column, Cell, Flex,
} from '@adobe/react-spectrum';

import { getUrlForNextPage } from './service';
import { Breed, BreedAttributes, getDisplayNameForAttribute } from './data';
import SingleDogRender from './single_dog_render';
import Compare from './compare';

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

      page += 1
      let json = await res.json();
      return {
        items: json,
        cursor: getUrlForNextPage(page).toString()
      };
    }
  });

  let columns = [
    BreedAttributes.dogName,
    BreedAttributes.bred_for,
    BreedAttributes.breed_group,
    BreedAttributes.life_span,
    BreedAttributes.temperament,
    BreedAttributes.origin,
  ].map((attribute) => {
    return { name: getDisplayNameForAttribute(attribute), key: attribute }
  })

  function getCell(item: Breed, field: keyof Breed) {
    switch (field) {
      case "name":
        return <Cell>
          <Flex columnGap="size-200">
            <Flex width="40px" height="40px">
              <Image src={item.image.url} alt={item.name} objectFit="cover" />
            </Flex>
            <DialogTrigger type="fullscreenTakeover">
              <ActionButton alignSelf="start" width={"size-3000"}>
                <Heading level={5}>{item.name}</Heading>
              </ActionButton>
              {(close) => (
                <Dialog>
                  <SingleDogRender item={item} ></SingleDogRender>
                  <ButtonGroup>
                    <Button variant="cta" onPress={close} autoFocus>
                      Done
                    </Button>
                  </ButtonGroup>
                </Dialog>
              )}
            </DialogTrigger>
          </Flex></Cell>;
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
  let [selectedKeys, setSelectedKeys] = React.useState<'all' | Iterable<string>>(new Set([]));

  function handleSelectedKeys(keys: 'all' | Iterable<Key>) {
    if (keys === 'all') {
      setSelectedKeys(new Set(list.items.map(item => item.name)))
    } else {
      setSelectedKeys(new Set((keys as Iterable<string>)));
    }
  }

  return (
    <Provider theme={defaultTheme}>
      <div className="heading">
        <Flex justifyContent="center"><Heading level={1}>Welcome to Dogs Home</Heading></Flex>
      </div>
      <div className="dogs-container">
        <DialogTrigger type="fullscreenTakeover">
          {/* Disable the compare button if no entities are selected or too many (>=4) are selected */}
          <Flex gap={"size-100"} alignItems={"center"} margin="size-200">
            <ActionButton alignSelf="start" marginTop={"4px"}
              isDisabled={selectedKeys !== 'all' && ((selectedKeys as Set<Key>).size <= 1
                || (selectedKeys as Set<Key>).size >= 4)}>
              Compare
            </ActionButton>
            {selectedKeys !== 'all' && ((selectedKeys as Set<Key>).size <= 1
              || (selectedKeys as Set<Key>).size >= 4) ? <p className="compare-instruction">Select 2 - 3 Dogs to compare</p> : null}
          </Flex>
          {(close) => (
            <Dialog>
              <Compare items={selectedKeys === 'all' ? list.items : list.items.filter(item => (selectedKeys as Set<Key>).has(item.name))} />
              <ButtonGroup>
                <Button variant="cta" onPress={close} autoFocus>
                  Done
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>


        <TableView aria-label="example async loading table" height="size-6000"
          overflowMode="wrap"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectedKeys}>
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
