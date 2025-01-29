import DashboardCard from "../../components/admin/DashboardCard";

const Admin = () => {
  return (
    <div className="bg-[#F5F5F3]">
      {/* Dashboard Content */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sales Card */}
          <DashboardCard
            title="Sales"
            stats="Coming Soon"
            description="Loading..."
            link={"/admin/sales"}
          />
          {/* Customers Card */}
          <DashboardCard
            title="Customers"
            stats={localStorage.getItem("cstNum") || "Loading..."}
            description="Loading..."
            link={"/admin/customers"}
          />
          {/* Active Products Card */}
          <DashboardCard
            title="Active Products"
            stats={localStorage.getItem("prdtNum") || "Loading..."}
            description="Loading..."
            link={"/admin/products"}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
