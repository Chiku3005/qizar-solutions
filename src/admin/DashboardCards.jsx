import {
  FaBox,
  FaBoxes,
  FaExclamationTriangle,
  FaLayerGroup,
} from "react-icons/fa";

import "./DashboardCards.css";

function DashboardCards({
  totalProducts = 0,
  totalStock = 0,
  lowStock = 0,
  categories = 0,
}) {
  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <FaBox />,
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: <FaBoxes />,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <FaExclamationTriangle />,
    },
    {
      title: "Categories",
      value: categories,
      icon: <FaLayerGroup />,
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div className="dashboard-card" key={card.title}>
          <div className="dashboard-card-icon">
            {card.icon}
          </div>

          <div className="dashboard-card-info">
            <p>{card.title}</p>
            <h3>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;