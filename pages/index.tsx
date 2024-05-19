import React from "react"
import { Box, Space, Text } from '@mantine/core';
import Layout from "../components/Layout";
import CreateSupportTicketForm from "../components/CreateSupportTicketForm";

const CreateSupportTicket: React.FC = () => {
  return (
    <>
      <Layout>
        <Box mx={50} my="md">
          <Text size="xl" fw={700}>Create A New Support Ticket</Text>
          <Space h="md" />
          
          <CreateSupportTicketForm />
        </Box>
      </Layout>
    </>
  );
}

export default CreateSupportTicket
