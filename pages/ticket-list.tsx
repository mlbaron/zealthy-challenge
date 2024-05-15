import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import { Status } from '@prisma/client';
import { Box, Text, Table, Space } from '@mantine/core';
import SupportTicketRow, { SupportTicketProps } from '../components/SupportTicketsTable';
import SupportTicketsTable from '../components/SupportTicketsTable';

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
                <SupportTicketsTable supportTickets={props.supportTickets}/>
            </Box>
        </Layout>
    );
};

export default SupportTickets;