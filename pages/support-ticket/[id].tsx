import React, { useState } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { Text, Box, Space, Select, Notification, Textarea, Group, Button } from '@mantine/core';
import { SupportTicketProps } from "../../components/SupportTicketsTable";
import prisma from "../../lib/prisma";
import { Status } from "@prisma/client";
import { stringValueForStatusEnum } from "../../utils";
import { useForm } from '@mantine/form';

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

interface StatusSelectionItem {
    value: string;
    label: string;
}

function statusSelectionArray(): StatusSelectionItem[] {
    const selectionData: StatusSelectionItem[] = [];

    for (const statusValue of Object.values(Status)) {
        selectionData.push({ value: statusValue, label: stringValueForStatusEnum(statusValue) })
    }

    return selectionData
}

type Props = {
    supportTicket: SupportTicketProps;
};

const SupportTicket: React.FC<SupportTicketProps> = (props) => {
    const [statusValue, setStatusValue] = useState(() => props.status as string);
    const [reportersEmailAddress, setReportersEmailAddress] = useState(() => props.user.email);
    const [showStatusChangedSuccessfullyNotification, setShowStatusChangedSuccessfullyNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            response: '',
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        const responseToEmailToReporter = values.response;

        console.log(`Would normally send email to ${reportersEmailAddress} here, with body: ${responseToEmailToReporter}`)

        // Reset the form to its initial state
        form.reset()
    };

    const handleSelectionChange = async (supportTicketId: string, status: string) => {
        // Return early if the user re-selects the same statuss
        if (status == statusValue) {
            return;
        }

        setStatusValue(status);

        try {
            const body = { status };

            await fetch(`/api/update-status/${supportTicketId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            handleShowStatusChangedSuccessfullyNotification()
        } catch (error) {
            handleShowErrorNotification()
        }
    };

    const notificationDisplayTime = 2500;

    const handleShowStatusChangedSuccessfullyNotification = () => {
        setShowStatusChangedSuccessfullyNotification(true);

        // Hide the notification after 2.5 seconds
        setTimeout(() => {
            setShowStatusChangedSuccessfullyNotification(false);
        }, notificationDisplayTime);
    }

    const handleShowErrorNotification = () => {
        setShowErrorNotification(true);

        // Hide the notification after 2.5 seconds
        setTimeout(() => {
            setShowErrorNotification(false);
        }, notificationDisplayTime);
    }

    return (
        <Layout>
            <Box mx={50} my="md">
                <Text size="xl" fw={700}>Reporter's Name</Text>
                <Text>{props.user.name}</Text>
                <Space h="md" />

                <Text size="xl" fw={700}>Reporter's Email Address</Text>
                <Text>{props.user.email}</Text>
                <Space h="md" />

                <Text size="xl" fw={700}>Description</Text>
                <Text>{props.description}</Text>
                <Space h="md" />

                <Text size="xl" fw={700}>Status</Text>
                <Select
                    w={200}
                    allowDeselect={false}
                    value={statusValue}
                    data={statusSelectionArray()}
                    onChange={(_value) => handleSelectionChange(props.id, _value)}
                />
                <Space h="md" />

                <Text size="xl" fw={700}>Email the Reporter</Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Textarea
                        description="Type a response to send to the reporter"
                        placeholder="The text you enter here will be emailed to the reporter"
                        key={form.key('response')}
                        {...form.getInputProps('response')}
                    />
                    <Group mt="md">
                        <Button type="submit">Email the reporter</Button>
                    </Group>
                </form>
                <Space h="md" />

                {
                    showStatusChangedSuccessfullyNotification && (
                        <Notification
                            title="Ticket status was successfully updated"
                            color="green"
                            w={400}
                            withCloseButton={false}
                        >
                        </Notification>
                    )
                }

                {
                    showErrorNotification && (
                        <Notification
                            title="Error updating the status of this ticket"
                            color="red"
                            w={400}
                            withCloseButton={false}
                        >
                            Please try again!
                        </Notification>
                    )
                }
            </Box>
        </Layout>
    )
}

export default SupportTicket