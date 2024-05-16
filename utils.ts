import { Status } from "@prisma/client"

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