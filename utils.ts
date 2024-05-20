import { Status } from "@prisma/client"

export const notificationDisplayTime = 2500;

export function stringValueForStatusEnum(status: Status): string {
    switch (status) {
        case Status.NEW:
            return "New"
        case Status.INPROGRESS:
            return "In Progress"
        case Status.RESOLVED:
            return "Resolved"
    }
}