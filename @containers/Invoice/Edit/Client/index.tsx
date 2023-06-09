// Core types
import type { FC } from "react";

// GLobal components
import { Button, Heading } from "@components";

// Vendors
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useFormikContext } from "formik";
import styled, { css } from "styled-components";

// Core types
import { Client as ClientTypes, Invoice as InvoiceTypes } from "@types";
import { Field } from "@styles/Form";
import { formatDate } from "@utils/client";

const Client = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

const Date = styled.div`
  display: flex;
  align-items: center;

  p {
    width: 100%;
    margin-right: 10px;
  }

  input {
    font-size: 14px;
  }
`;

const CustomSelect = styled(Select)`
  width: 235px;

  ${({ theme: { colors } }) => css`
    * > input {
      padding: 5px 0 !important;
    }

    * {
      font-size: 14px;
      border-radius: 5px !important;
      border-color: ${colors.gray} !important;
    }
  `}
`;

const Invoice = styled.div`
  display: flex;
  align-items: center;

  h5 {
    width: 43%;
    // margin-right: 40px;
  }

  input {
    flex: 0 0 30% !important;
    padding: 5px 10px !important;
    font-size: 14px;
  }
`;

interface Client {
  clientOption?: any;
  startDate: any;
  endDate: any;
  deadlineDate: any;
  setStartDate: any;
  setEndDate: any;
  setDeadlineDate: any;
  client: Partial<ClientTypes>;
  toggledArticles: any;
  setToggleArticles: any;
  setClientOption: any;
  values: any;
  invoice: InvoiceTypes;
}

const index: FC<Client> = ({
  startDate,
  endDate,
  deadlineDate,
  setStartDate,
  setEndDate,
  setDeadlineDate,
  toggledArticles,
  setToggleArticles,
  client,
  setClientOption,
  values,
  invoice,
}) => {
  const { handleBlur, handleChange } = useFormikContext();

  // Handle types
  const handleChangeType = (e: any) => {
    setClientOption(e.value);
  };

  return (
    <Client>
      <div>
        {client ? (
          <>
            <Heading as="h6" weight="bold">
              {client.clientName}
            </Heading>
            <Heading as="p">{client.clientAddress}</Heading>
            <Heading as="p">
              {client.zipCode}, {client.city},{client.country}
            </Heading>
            <Heading as="p">Davčna številka: {client.taxNumber}</Heading>
          </>
        ) : (
          <>
            {/* <CustomSelect
              instanceId="newClient"
              options={}
              placeholder="Choose existing one"
              onChange={(e) => handleChangeType(e)}
              onBlur={handleBlur}
            /> */}
            <div>select</div>
            <div>or</div>

            <Button
              variant="primary"
              type="button"
              size="small"
              onClick={() => setToggleArticles(!toggledArticles)}
            >
              Add new client
            </Button>
          </>
        )}
      </div>

      <div>
        <Invoice>
          <Heading
            as="h5"
            weight="semiBold"
            padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 0 } }}
          >
            Invoice:
          </Heading>

          <Field
            type="number"
            name="invoiceNumber"
            placeholder="0.0 €"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.invoiceNumber}
          />
        </Invoice>

        <Date>
          <Heading as="p">Date from:</Heading>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText={formatDate(invoice.startDate)}
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">Date to:</Heading>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText={formatDate(invoice.endDate)}
            dateFormat="dd/MM/yyyy"
          />
        </Date>

        <Date>
          <Heading as="p">Payment deadline:</Heading>

          <DatePicker
            selected={deadlineDate}
            onChange={(date) => setDeadlineDate(date)}
            placeholderText={formatDate(invoice.paymentDeadline)}
            dateFormat="dd/MM/yyyy"
          />
        </Date>
      </div>
    </Client>
  );
};

export { index as ClientDetails };
