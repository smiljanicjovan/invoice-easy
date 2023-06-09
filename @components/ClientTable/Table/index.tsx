// Core types
import { useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Grid store
import { GridContext } from "..";

// Local component
import { Item } from "./Item";
import { Placeholder } from "./Placeholder";

const NotFound = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  border-radius: 5px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}

  td {
    padding: 15px;

    &:nth-child(1) {
      width: 25%;
    }

    &:nth-child(2) {
      width: 25%;
    }

    &:nth-child(3) {
      width: 25%;
    }

    &:nth-child(4) {
      width: 25%;
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      text-align: right;
    }
  }
`;

const index: FC = () => {
  // Grid context
  const { length, updatedItems, isLoading } = useContext(GridContext);

  return (
    <>
      {isLoading || !updatedItems ? (
        <Placeholder />
      ) : length === 0 ? (
        <NotFound>Sorry, we didn't find any invoices...</NotFound>
      ) : (
        <Table>
          <Thead>
            <tr>
              <td>ID</td>
              <td>Client name</td>
              <td>Client address</td>
              <td>Actions</td>
            </tr>
          </Thead>

          {Array.isArray(updatedItems) &&
            updatedItems.map((item, i) => <Item $item={item} key={i} />)}
        </Table>
      )}
    </>
  );
};

export { index as Table };
