import React from "react";

const StockTotal = ({ currentItems, totalItems }) => {
    return (
        <div className="fs-14">
            {currentItems.length} de {totalItems} vehículos
        </div>
    );
};

export default StockTotal;
