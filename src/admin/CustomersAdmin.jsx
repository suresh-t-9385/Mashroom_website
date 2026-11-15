// src/admin/CustomersAdmin.jsx
import DataTable from "../components/common/DataTable";

const customers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "customer@example.com",
    orders: 12,
    spend: 8450,
    joined: "2025-06-12",
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul@example.com",
    orders: 34,
    spend: 31200,
    joined: "2024-11-03",
  },
  {
    id: 3,
    name: "Anjali Menon",
    email: "anjali@example.com",
    orders: 7,
    spend: 4120,
    joined: "2025-09-21",
  },
];

export default function CustomersAdmin() {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "orders", header: "Orders" },
    {
      key: "spend",
      header: "Lifetime spend",
      render: (r) => `₹${r.spend.toLocaleString("en-IN")}`,
    },
    { key: "joined", header: "Joined" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Customers</h1>
      <p className="mt-1 text-sm text-earth-600">
        Customer accounts and lifetime value.
      </p>
      <div className="mt-6">
        <DataTable columns={columns} rows={customers} />
      </div>
    </div>
  );
}
