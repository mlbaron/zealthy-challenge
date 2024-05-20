import React from "react";
import Router from "next/router";
import { Table } from "@mantine/core";
import { Status } from "@prisma/client";
import { stringValueForStatusEnum } from "../utils";
import Link from "next/link";

export type SupportTicketProps = {
  id: string;
  description: string;
  status: Status;
  user: {
    name: string;
    email: string;
  } | null;
};

type Props = {
  supportTickets: SupportTicketProps[];
};

const SupportTicketsTable: React.FC<Props> = (props) => {
  const handleRowClick = (supportTicket) => {
    Router.push("/support-ticket/[id]", `/support-ticket/${supportTicket.id}`)
  };
  
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Reporter's Name</Table.Th>
          <Table.Th>Reporter's Email</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Description</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {props.supportTickets.map((supportTicket) => (
          <Table.Tr key={supportTicket.id} onClick={() => handleRowClick(supportTicket)}>
            <Table.Td>{supportTicket.user.name}</Table.Td>
            <Table.Td>{supportTicket.user.email}</Table.Td>
            <Table.Td>{stringValueForStatusEnum(supportTicket.status)}</Table.Td>
            <Table.Td>{supportTicket.description}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default SupportTicketsTable;