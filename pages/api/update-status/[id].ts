import prisma from '../../../lib/prisma';

// PUT /api/update-status/:id
// Required fields in body: status 
export default async function handle(req, res) {
  const supportTicketId = req.query.id;
  const { status } = req.body;

  const supportTicket = await prisma.supportTicket.update({
    where: { id: supportTicketId },
    data: { status: status },
  });

  res.json(supportTicket);
}