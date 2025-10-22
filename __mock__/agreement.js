const mockAgreement = {
    "agreementId": "AG-2025-00123",
    "title": "Content Partnership Agreement",
    "status": "reviewed",
    "effectiveDate": "2025-01-01",
    "expiryDate": "2026-01-01",
    "parties": {
        "provider": {
            "id": "org-9876",
            "name": "MediaStream Inc.",
            "contact": {
                "email": "contact@mediastream.com",
                "phone": "+1-555-212-3344"
            },
            "address": "250 King Street, Toronto, ON, Canada"
        },
        "partner": {
            "id": "org-1234",
            "name": "StreamHub Ltd.",
            "contact": {
                "email": "support@streamhub.com",
                "phone": "+44-20-8899-3344"
            },
            "address": "1 King's Road, London, UK"
        }
    },
    "terms": {
        "contentRights": {
            "exclusive": false,
            "territories": ["US", "CA", "UK"],
            "distributionPlatforms": ["web", "mobile", "tv"]
        },
        "revenueShare": {
            "provider": 60,
            "partner": 40,
            "currency": "USD"
        },
        "termination": {
            "noticePeriodDays": 30,
            "terminationConditions": [
                "Breach of contract",
                "Non-payment for 60 days",
                "Mutual consent"
            ]
        }
    },
    loc_details: { "locations": [123, 456] },
    "allowedCustomers": [
        {
            "cust_Id": "cust-7788",
            "name": "Acme Productions",
            "accessLevel": "read"
        },
        {
            "cust_Id": "cust-9988",
            "name": "FilmStudio 9",
            "accessLevel": "write"
        }
    ],
    "createdBy": {
        "userId": "u-1001",
        "name": "John Shone",
        "role": "agreement_manager"
    },
    "createdAt": "2025-01-05T10:30:00Z",
    "lastModifiedAt": "2025-03-10T15:00:00Z"
}

export default mockAgreement;