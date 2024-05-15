import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { Text, Box } from '@mantine/core';
import { SupportTicketProps } from "../../components/SupportTicketsTable";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const supportTicket = await prisma.supportTicket.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            user: {
                select: { name: true, email: true },
            },
        },
    });
    return {
        props: supportTicket,
    }
}

const SupportTicket: React.FC<SupportTicketProps> = (props) => {
    return (
        <Layout>
            <Box mx={50} my="md">
                <Text size="xl">Testing 123</Text>
            </Box>
        </Layout>
    )
}

export default SupportTicket