import { Link } from "react-router-dom";

const DashboardCard = ({ title, stats, description, link }) => {
  return (
    <div className="bg-white hover:bg-gray-50 shadow hover:shadow-2xl hover:shadow-gray-300 hover:scale-105 duration-300 rounded-lg p-6">
      <Link to={link}>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-2xl font-bold text-gray-900 mt-4">{stats}</p>
      </Link>
    </div>
  );
};

export default DashboardCard;
