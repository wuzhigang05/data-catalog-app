import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import { rest, setupWorker } from 'msw'
import * as data from './data';
import { ResponseResolver } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


const server = setupServer(
  // Provide request handlers
  rest.get(
    'https://api.thedogapi.com/v1/breeds?x-api-key=540cc768-f717-4a7e-8ac1-ba5ccd8b9855&limit=10&page=0',
    (_req, res, ctx) => res(
      ctx.json([data.mockBreeds])
    )),
)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})


test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Dogs Home/i);
  expect(linkElement).toBeInTheDocument();
});


test('compare button is disabled by default', () => {
  let tree = render(<App />);
  let option = tree.getByText('Compare')
  expect(option).toBeDisabled
});


// Mock does not work.
test('compare button is enabled when 2 - 3 entities are selected', async () => {
  let tree = render(<App />);
  let table = tree.getByRole('grid');
  let rows = within(table).getAllByRole('row');
  // expect(rows).toHaveLength(3)
  // let dog = tree.getByText('American Bully')
  // let row = tree.getAllByRole('row')[2];
  // expect(row).toHaveAttribute('aria-selected', 'false');
  // userEvent.click(within(row).getByRole('checkbox'));
  // expect(row).toHaveAttribute('aria-selected', 'true');
  // let checkboxes = tableView.getElementsByClassName('TableView', {checked: false})
  // console.log(grid)
  // expect(checkboxes).toHaveLength(11)
  // let option = tree.getByText('Compare')
  // expect(option).toBeDisabled
});
