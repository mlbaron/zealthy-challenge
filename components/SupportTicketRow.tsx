import React from "react";
import Router from "next/router";
import { Table } from "@mantine/core";
import { Status } from "@prisma/client";

export type SupportTicketProps = {
  id: string;
  description: string;
  status: Status;
  user: {
    name: string;
    email: string;
  } | null;
};

const SupportTicketRow: React.FC<{ supportTicket: SupportTicketProps }> = ({ supportTicket }) => {
  return (
    <Table.Tr key={supportTicket.id}>
      <Table.Td>{supportTicket.user.name}</Table.Td>
      <Table.Td>{supportTicket.user.email}</Table.Td>
      <Table.Td>{supportTicket.status}</Table.Td>
      <Table.Td>{supportTicket.description}</Table.Td>
    </Table.Tr>
  );
};

export default SupportTicketRow;