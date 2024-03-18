import React from "react";

const OrderMenu = ({active, history, orderId, children}) => {
    const handleShowDetails = () => {
        history.push(`/order/${orderId}/details`)
    };

    const handleShowRegistrations = () => {
        history.push(`/order/${orderId}/registrations`)
    };

    const handleShowPackages = () => {
        history.push(`/order/${orderId}/packages`)
    };

    const handleShowPayments = () => {
        history.push(`/order/${orderId}/payments`)
    };
    return (
        <div className="actions">
            {active !== 'details' && <button onClick={handleShowDetails}>Details</button>}
            {active !== 'registrations' && <button onClick={handleShowRegistrations}>Registrations</button>}
            {active !== 'packages' && <button onClick={handleShowPackages}>Packages</button>}
            {active !== 'payments' && <button onClick={handleShowPayments}>Payments</button>}
            {children}
        </div>
    )
}

export default OrderMenu;