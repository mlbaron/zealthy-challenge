import React, { useState } from "react"
import { Notification, TextInput, Space, Textarea, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

const CreateSupportTicketForm: React.FC = () => {
    const [showSupportTicketCreatedNotification, setShowSupportTicketCreatedNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            name: '',
            description: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const notificationDisplayTime = 2500;

    const handleShowSupportTicketCreatedNotification = () => {
        setShowSupportTicketCreatedNotification(true);

        // Hide the notification after 2.5 seconds
        setTimeout(() => {
            setShowSupportTicketCreatedNotification(false);
        }, notificationDisplayTime);
    }

    const handleShowErrorNotification = () => {
        setShowErrorNotification(true);

        // Hide the notification after 2.5 seconds
        setTimeout(() => {
            setShowErrorNotification(false);
        }, notificationDisplayTime);
    }

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const email = values.email;
            const name = values.name;
            const description = values.description

            const body = { name, email, description };

            await fetch('/api/support-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            // Reset the form to its initial state
            form.reset()

            // Email the reporter of the ticket that the ticket was created
            console.log(`Would normally send email to ${email} here, with body: A ticket was created with the following description: ${description}`)

            handleShowSupportTicketCreatedNotification()
        } catch (error) {
            handleShowErrorNotification()
        }
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    w={400}
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <Space h="md" />

                <TextInput
                    w={400}
                    withAsterisk
                    label="Name"
                    placeholder="Your Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <Space h="md" />

                <Textarea
                    w={600}
                    withAsterisk
                    label="Issue"
                    description="Enter a summary of the problem you're experiencing"
                    placeholder=" "
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />

                <Group mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
            <Space h="md" />

            {
                showSupportTicketCreatedNotification && (
                    <Notification
                        title="New Ticket Successfully Created"
                        color="green"
                        withCloseButton={false}
                        w={400}
                    >
                    </Notification>
                )
            }

            {
                showErrorNotification && (
                    <Notification
                        title="Error creating support ticket"
                        color="red"
                        withCloseButton={false}
                        w={400}
                    >
                        Please try again!
                    </Notification>
                )
            }
        </>
    )
}

export default CreateSupportTicketForm;
