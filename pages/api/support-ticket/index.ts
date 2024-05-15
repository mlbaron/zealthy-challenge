import { User } from '@prisma/client';
import prisma from '../../../lib/prisma';

// POST /api/support-ticket
// Required fields in body: email, name, description 
export default async function handle(req, res) {
    const { email, name, description } = req.body;

    // Check if the user already exists
    var currentUser: User

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        currentUser = existingUser;
    } else {
        // User does not exist, create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        currentUser = newUser;
    }

    const result = await prisma.supportTicket.create({
        data: {
            description: description,
            userId: currentUser.id
        }
    });

    res.json(result);
}