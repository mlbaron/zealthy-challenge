
import React, { useState } from "react"
import { useForm } from '@mantine/form';
import { Space, Textarea, Group, Button } from '@mantine/core';

type Props = {
    email: string;
};

const SupportTicketResponseForm: React.FC<Props> = (props) => {
    const [reportersEmailAddress, setReportersEmailAddress] = useState(() => props.email);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            response: '',
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        const responseToEmailToReporter = values.response;

        // Reset the form to its initial state
        form.reset()

        console.log(`Would normally send email to ${reportersEmailAddress} here, with body: ${responseToEmailToReporter}`)
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    w={600}
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
        </>
    )
}

export default SupportTicketResponseForm;
