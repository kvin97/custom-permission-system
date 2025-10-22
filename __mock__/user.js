const mockUser = {
    "userId": "u-1001",
    "name": "John Shone",
    "email": "john.shone@media.strm.com",
    "role": "agreement_manager",
    "organization": {
        "orgId": "org-9876",
        "name": "MediaStream Inc."
    },
    "locations": [123, 456, 567],
    "attachedCustomers": [
        {
            "customerId": "cust-7788",
            "name": "Acme Productions"
        },
        {
            "customerId": "cust-9988",
            "name": "Acme Mode Productions"
        },
        {
            "customerId": "cust-5555",
            "name": "OceanView Studios"
        },
        {
            "customerId": "cust-5557",
            "name": "Stream Studios"
        }
    ],
    "permissions": [
        "agreement:read",
        "agreement:list",
        "agreement:write",
        "agreement:delete"
    ],
    "attributes": {
        "region": "CA",
        "department": "Legal",
        "level": 3
    },
    "status": "active",
    "lastLogin": "2025-10-20T09:30:00Z"
}

export default mockUser;
