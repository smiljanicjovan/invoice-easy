// Core types
import type { ChangeEvent, FC } from "react";

// Global styles
import { Field } from "@styles/Form";

// Global components
import { Button } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Svg
import { Trash } from "public/svg";

const Table = styled.div``;

const Head = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Item = styled.div`
  padding: 15px;

  &:nth-child(1) {
    flex: 0 0 50%;
  }

  &:nth-child(2) {
    flex: 0 0 15%;
  }

  &:nth-child(3) {
    flex: 0 0 15%;
  }

  &:nth-child(4) {
    flex: 0 0 15%;
  }

  &:nth-child(5) {
    padding: 0;
    flex: 0 0 5%;
    cursor: pointer;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${Item} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

type Values = {
  name: string;
  cost: number;
  qty: number;
  price: number;
};

interface Table {
  tableData: Values[];
  setTableData: any;
}

const index: FC<Table> = ({ tableData, setTableData }) => {
  // Function to handle input changes in each cell
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: any
  ) => {
    const newData: any = [...tableData];
    newData[index][field] = e.target.value;

    // Calculate the price
    const cost = parseFloat(newData[index].cost);
    const qty = parseFloat(newData[index].qty);
    if (!isNaN(cost) && !isNaN(qty)) {
      newData[index].price = (cost * qty).toString();
    } else {
      newData[index].price = "";
    }

    setTableData(newData);
  };

  // Function to handle adding a new row
  const addRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        cost: 0,
        qty: 0,
        price: 0,
      },
    ]);
  };

  // Function to handle item removal
  const removeItem = (index: number) => {
    const updatedItems = [...tableData];

    updatedItems.splice(index, 1);
    setTableData(updatedItems);
  };

  return (
    <>
      <Table>
        <Head>
          <Item>Item</Item>
          <Item>Cost</Item>
          <Item>QTY</Item>
          <Item>Price</Item>
        </Head>

        <Body>
          {tableData.map((row, index) => (
            <Wrap key={index}>
              <Item>
                <Field
                  type="text"
                  name="name"
                  placeholder="Item"
                  onChange={(e) => handleInputChange(e, index, "name")}
                  value={row.name}
                />
              </Item>

              <Item>
                <Field
                  type="number"
                  name="cost"
                  placeholder="Cost"
                  onChange={(e) => handleInputChange(e, index, "cost")}
                  value={row.cost}
                />
              </Item>

              <Item>
                <Field
                  type="number"
                  name="qty"
                  placeholder="QTY"
                  onChange={(e) => handleInputChange(e, index, "qty")}
                  value={row.qty}
                />
              </Item>

              <Item>
                <Field
                  type="number"
                  name="price"
                  disabled
                  placeholder="00.00"
                  onChange={(e) => handleInputChange(e, index, "price")}
                  value={row.price}
                />
              </Item>

              <Item>
                {index !== 0 && (
                  <div onClick={() => removeItem(index)}>
                    <Trash />
                  </div>
                )}
              </Item>
            </Wrap>
          ))}
        </Body>
      </Table>

      <Button
        type="button"
        variant="secondary"
        size="small"
        margin={{
          xs: { top: 1, bottom: 1, left: 2 },
          sm: { top: 1, bottom: 1, left: 2 },
          md: { top: 1, bottom: 1, left: 2 },
        }}
        onClick={addRow}
      >
        Add Row
      </Button>
    </>
  );
};

export { index as Table };
