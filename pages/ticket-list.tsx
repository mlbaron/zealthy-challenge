import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';
import { Status } from '@prisma/client';
import { Box, Text, Table, Space } from '@mantine/core';
import SupportTicketRow, { SupportTicketProps } from '../components/SupportTicketRow';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const supportTickets = await prisma.supportTicket.findMany({
        include: {
            user: {
                select: { name: true, email: true },
            },
        },
    });
    return {
        props: { supportTickets },
    };
};

type Props = {
    supportTickets: SupportTicketProps[];
};

const SupportTickets: React.FC<Props> = (props) => {
    return (
        <Layout>
            <Box mx={50} my="md">
                <Text size="xl" fw={700}>Support Tickets</Text>
                <Space h="md" />

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
                            <SupportTicketRow supportTicket={supportTicket} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>
        </Layout>
    );
};

export default SupportTickets;