import React from "react"
import { Box } from '@mantine/core';
import Layout from "../components/Layout";
import CreateSupportTicketForm from "../components/CreateSupportTicketForm";

const CreateSupportTicket: React.FC = () => {
  return (
    <>
      <Layout>
        <Box mx={50} my="md">
          <CreateSupportTicketForm />
        </Box>
      </Layout>
    </>
  );
}

export default CreateSupportTicket
