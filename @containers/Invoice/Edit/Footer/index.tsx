// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global types
import { MyAccount } from "@types";

// Vendors
import styled, { css } from "styled-components";

const Note = styled.div`
  width: 60%;
  padding: 80px 15px;

  p {
    font-size: 10px;
    line-height: 1.5;
  }
`;

const Footer = styled.div`
  text-align: center;

  ${({ theme: { font } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }
  `}
`;

interface Footer {
  account: MyAccount;
}

const index: FC<Footer> = ({ account }) => {
  return (
    <>
      <Note>
        <Heading as="p">
          DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona o davku na
          dodano vrednost. (nisem zavezanec za DDV). PRI POSLOVANJU NE
          UPORABLJAM ŽIGA.
        </Heading>
        <Heading as="p">
          Znesek računa poravnajte na transakcijski račun odprt pri N26.,
          številka DE91 1001 1001 2623 8152 93. Pri plačilu se sklicujte na
          številko računa
        </Heading>
      </Note>

      <Footer>
        <p>
          {account.companyField}, {account.companyName}. Transakcijski račun
          odprt pri {account.bankName} – {account.trr}
          ., davčna številka: {account.taxNumber}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
