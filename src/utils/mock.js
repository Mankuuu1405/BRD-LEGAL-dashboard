// mock.js - Centralized Mock Data

export const MockAPI = {
  // ---------------------------------------------
  // 1. Legal Dashboard Mock
  // ---------------------------------------------
  getLegalDashboard() {
    return {
      metrics: [
        {
          title: "Pending Reviews",
          value: "28",
          trend: -5,
          color: "yellow",
          icon: "ClockIcon",
        },
        {
          title: "Approved Today",
          value: "12",
          trend: 4.2,
          color: "green",
          icon: "CheckCircleIcon",
        },
        {
          title: "Average TAT",
          value: "1.2 days",
          trend: -8.5,
          color: "blue",
          icon: "ArrowPathIcon",
        },
        {
          title: "Compliance Score",
          value: "96%",
          trend: 2.1,
          color: "green",
          icon: "ShieldCheckIcon",
        },
      ],

      recentDocuments: [
        {
          id: "DOC-2001",
          type: "Loan Agreement",
          status: "Under Review",
          priority: "High",
        },
        {
          id: "DOC-2002",
          type: "Property Papers",
          status: "Pending",
          priority: "Medium",
        },
        {
          id: "DOC-2003",
          type: "Collateral Docs",
          status: "Approved",
          priority: "High",
        },
        {
          id: "DOC-2004",
          type: "Income Proof",
          status: "Rejected",
          priority: "Low",
        },
      ],
    };
  },

  // ---------------------------------------------
  // 2. Agreement Approvals Mock
  // ---------------------------------------------
  getAgreements() {
    return [
      {
        id: "AGR-2101",
        type: "Loan Agreement",
        client: "Vikram Singh",
        amount: "₹450,000",
        submittedDate: "2025-11-03",
        priority: "High",
        status: "Pending",
        assignedTo: "Priya Mehta",
      },
      {
        id: "AGR-2102",
        type: "Collateral Agreement",
        client: "Sneha Kumar",
        amount: "₹750,000",
        submittedDate: "2025-11-03",
        priority: "Medium",
        status: "Under Review",
        assignedTo: "Rahul Sharma",
      },
      {
        id: "AGR-2103",
        type: "Property Mortgage",
        client: "Arun Patel",
        amount: "₹1,200,000",
        submittedDate: "2025-11-02",
        priority: "High",
        status: "Approved",
        assignedTo: "Priya Mehta",
      },
      {
        id: "AGR-2104",
        type: "Guarantor Agreement",
        client: "Maya Reddy",
        amount: "₹350,000",
        submittedDate: "2025-11-02",
        priority: "Low",
        status: "Pending",
        assignedTo: "Rahul Sharma",
      },
    ];
  },


  // ---------------------------------------------
// 3. Document Validation Mock
// ---------------------------------------------
getDocuments() {
  return [
    {
      id: "DOC-2101",
      name: "Property Sale Deed",
      type: "Property Document",
      client: "Amit Kumar",
      uploadDate: "2025-11-03",
      status: "Pending",
      issues: [],
    },
    {
      id: "DOC-2102",
      name: "Income Tax Returns",
      type: "Income Proof",
      client: "Priya Sharma",
      uploadDate: "2025-11-03",
      status: "Invalid",
      issues: ["Incomplete information", "Missing signatures"],
    },
    {
      id: "DOC-2103",
      name: "Bank Statements",
      type: "Financial Document",
      client: "Rahul Verma",
      uploadDate: "2025-11-02",
      status: "Valid",
      issues: [],
    },
    {
      id: "DOC-2104",
      name: "Collateral Agreement",
      type: "Legal Document",
      client: "Sneha Reddy",
      uploadDate: "2025-11-02",
      status: "Pending",
      issues: [],
    },
  ];
},

};