db.claims.insertMany([
  {
    "_id": ObjectId("507f1f77bcf86cd799439011"),
    "userid": "USR001",
    "username": "john_doe",
    "demographic": {
      "age": 34,
      "height": "5'10\"",
      "weight": 175,
      "state": "CA",
      "zipcode": "90210"
    },
    "events": [
      {
        "eventid": "EVT001",
        "timestamp": ISODate("2024-01-15T09:30:00Z"),
        "eventType": "create",
        "eventSubType": "auto_accident",
        "notes": "Initial claim created for rear-end collision on Highway 101"
      },
      {
        "eventid": "EVT002",
        "timestamp": ISODate("2024-01-16T14:20:00Z"),
        "eventType": "documentation",
        "eventSubType": "police_report",
        "notes": "Police report #PR-2024-001234 received and uploaded"
      },
      {
        "eventid": "EVT003",
        "timestamp": ISODate("2024-01-18T11:45:00Z"),
        "eventType": "assessment",
        "eventSubType": "damage_estimate",
        "notes": "Vehicle damage assessed at $8,500 by certified appraiser"
      },
      {
        "eventid": "EVT004",
        "timestamp": ISODate("2024-01-22T16:10:00Z"),
        "eventType": "approval",
        "eventSubType": "claim_approved",
        "notes": "Claim approved for full damage amount minus $500 deductible"
      },
      {
        "eventid": "EVT005",
        "timestamp": ISODate("2024-01-25T10:30:00Z"),
        "eventType": "close",
        "eventSubType": "resolved",
        "notes": "Payment of $8,000 issued to claimant. Case closed successfully."
      }
    ]
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439012"),
    "userid": "USR002",
    "username": "sarah_wilson",
    "demographic": {
      "age": 28,
      "height": "5'6\"",
      "weight": 140,
      "state": "NY",
      "zipcode": "10001"
    },
    "events": [
      {
        "eventid": "EVT006",
        "timestamp": ISODate("2024-02-03T08:15:00Z"),
        "eventType": "create",
        "eventSubType": "property_damage",
        "notes": "Water damage claim filed for apartment flooding due to burst pipe"
      },
      {
        "eventid": "EVT007",
        "timestamp": ISODate("2024-02-04T13:30:00Z"),
        "eventType": "inspection",
        "eventSubType": "site_visit",
        "notes": "Insurance adjuster conducted on-site inspection of water damage"
      },
      {
        "eventid": "EVT008",
        "timestamp": ISODate("2024-02-06T09:00:00Z"),
        "eventType": "documentation",
        "eventSubType": "photos_submitted",
        "notes": "Claimant submitted 15 photos showing extent of water damage"
      },
      {
        "eventid": "EVT009",
        "timestamp": ISODate("2024-02-08T15:45:00Z"),
        "eventType": "assessment",
        "eventSubType": "repair_estimate",
        "notes": "Contractor estimate received: $12,300 for drywall, flooring, and electrical work"
      },
      {
        "eventid": "EVT010",
        "timestamp": ISODate("2024-02-10T11:20:00Z"),
        "eventType": "negotiation",
        "eventSubType": "settlement_discussion",
        "notes": "Settlement negotiated down to $11,000 after independent assessment"
      },
      {
        "eventid": "EVT011",
        "timestamp": ISODate("2024-02-12T14:00:00Z"),
        "eventType": "approval",
        "eventSubType": "settlement_approved",
        "notes": "Final settlement of $11,000 approved by claims manager"
      },
      {
        "eventid": "EVT012",
        "timestamp": ISODate("2024-02-15T10:10:00Z"),
        "eventType": "close",
        "eventSubType": "settled",
        "notes": "Settlement check issued and received. Claim closed with satisfaction."
      }
    ]
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439013"),
    "userid": "USR003",
    "username": "mike_chen",
    "demographic": {
      "age": 45,
      "height": "5'8\"",
      "weight": 185,
      "state": "TX",
      "zipcode": "75201"
    },
    "events": [
      {
        "eventid": "EVT013",
        "timestamp": ISODate("2024-01-28T07:45:00Z"),
        "eventType": "create",
        "eventSubType": "health_claim",
        "notes": "Medical claim filed for emergency room visit after workplace injury"
      },
      {
        "eventid": "EVT014",
        "timestamp": ISODate("2024-01-29T10:30:00Z"),
        "eventType": "documentation",
        "eventSubType": "medical_records",
        "notes": "Hospital records and physician notes received from Dallas General"
      },
      {
        "eventid": "EVT015",
        "timestamp": ISODate("2024-02-01T14:15:00Z"),
        "eventType": "review",
        "eventSubType": "medical_review",
        "notes": "Claim under medical review - treatment deemed necessary and appropriate"
      },
      {
        "eventid": "EVT016",
        "timestamp": ISODate("2024-02-05T16:20:00Z"),
        "eventType": "approval",
        "eventSubType": "partial_approval",
        "notes": "Approved for $3,200 of $3,800 total claim - $600 for non-covered services"
      },
      {
        "eventid": "EVT017",
        "timestamp": ISODate("2024-02-08T09:30:00Z"),
        "eventType": "close",
        "eventSubType": "processed",
        "notes": "Payment processed to healthcare provider. Remaining balance is patient responsibility."
      }
    ]
  },
  {
    "_id": ObjectId("507f1f77bcf86cd799439014"),
    "userid": "USR004",
    "username": "lisa_martinez",
    "demographic": {
      "age": 52,
      "height": "5'4\"",
      "weight": 155,
      "state": "FL",
      "zipcode": "33101"
    },
    "events": [
      {
        "eventid": "EVT018",
        "timestamp": ISODate("2024-02-10T12:00:00Z"),
        "eventType": "create",
        "eventSubType": "theft_claim",
        "notes": "Homeowner's claim filed for stolen jewelry and electronics during break-in"
      },
      {
        "eventid": "EVT019",
        "timestamp": ISODate("2024-02-11T08:30:00Z"),
        "eventType": "documentation",
        "eventSubType": "police_report",
        "notes": "Police report #2024-FL-5678 filed with Miami-Dade County Sheriff"
      },
      {
        "eventid": "EVT020",
        "timestamp": ISODate("2024-02-13T15:00:00Z"),
        "eventType": "investigation",
        "eventSubType": "fraud_check",
        "notes": "Standard fraud investigation initiated - no red flags identified"
      },
      {
        "eventid": "EVT021",
        "timestamp": ISODate("2024-02-16T11:30:00Z"),
        "eventType": "documentation",
        "eventSubType": "receipts_provided",
        "notes": "Claimant provided purchase receipts and appraisal documents for stolen items"
      },
      {
        "eventid": "EVT022",
        "timestamp": ISODate("2024-02-20T13:45:00Z"),
        "eventType": "assessment",
        "eventSubType": "value_determination",
        "notes": "Total claim value assessed at $15,600 based on current replacement costs"
      },
      {
        "eventid": "EVT023",
        "timestamp": ISODate("2024-02-22T09:15:00Z"),
        "eventType": "approval",
        "eventSubType": "claim_approved",
        "notes": "Full claim amount approved minus $1,000 deductible = $14,600"
      },
      {
        "eventid": "EVT024",
        "timestamp": ISODate("2024-02-25T14:30:00Z"),
        "eventType": "close",
        "eventSubType": "resolved",
        "notes": "Settlement payment of $14,600 issued via ACH transfer. Claim successfully resolved."
      }
    ]
  }
]
)

db.claims.find({
  events: {
    $elemMatch: {
      eventType: "documentation",
      eventSubType: "police_report"
    }
  }
})

db.claims.find({
  events: {
    $elemMatch: {
      eventType: "documentation",
      eventSubType: "police_report"
    }
  }
}).explain("executionStats")

db.claims.createIndex({ "events.eventType": 1, "events.eventSubType": 1 })

//selecting first event element from all documents, and updating them

db.claims.updateMany({

}, {
  $set: {
    "events.0.initiator": "Unspecified"
  }
})


//selecting One element from the array
db.claims.findOneAndUpdate({
  events: {
    $elemMatch: {
      eventType: "documentation",
      eventSubType: "police_report"
    }
  }
},
  {
    $set: {
      "events.$.status": "verified",
      "events.$.verifiedDate": new Date()
    }
  })
