import ACTIONS from "./Actions.js";
import RESOURCES from "./Resources.js";

const Policies = [
    {
        action: ACTIONS.AGREEMENT_GET,
        resource: RESOURCES.AGREEMENT,
        condition: {
            listOverlap: {
                "data.allowedCustomers[].cust_Id": "${user.attachedCustomers[].customerId}",
                "data.loc_details.locations": "${user.locations}",
            }
        }
    },
        {
        action: ACTIONS.AGREEMENT_LIST,
        resource: RESOURCES.AGREEMENT,
        condition: {
            listOverlap: {
                "data.customerIds": "${user.attachedCustomers[].customerId}",
            }
        }
    },
    {
        action: ACTIONS.AGREEMENT_DELETE,
        resource: RESOURCES.AGREEMENT,
        condition: {
            listOverlap: {
                "data.allowedCustomers[].cust_Id": "${user.attachedCustomers[].customerId}"
            },
            stringEquals: {
                "data.status": "draft"
            }
        }
    },
    {
        action: ACTIONS.AGREEMENT_UPDATE,
        resource: RESOURCES.AGREEMENT,
        condition: {
            listOverlap: {
                "data.allowedCustomers[].cust_Id": "${user.attachedCustomers[].customerId}"
            },
            stringEquals: {
                "data.status": "reviewed"
            }
        }
    },
]

export default Policies;