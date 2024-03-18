import React from "react";
import "./OrderMenu.css"

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

    const isDetailsDisabled = () => {
        return active === 'details';
    }

    const isPackagesDisabled = () => {
        return active === 'packages';
    }

    const isRegistrationsDisabled = () => {
        return active === 'registrations';
    }

    const isPaymentsDisabled = () => {
        return active === 'payments';
    }

    return (
        <div className="actions">
            <div className="order-menu-navigation">
                <button className={isDetailsDisabled() ? "btn btn-disabled" : ""}  onClick={handleShowDetails} disabled={isDetailsDisabled()}>Details</button>
                <button className={isRegistrationsDisabled() ? "btn btn-disabled" : ""} onClick={handleShowRegistrations} disabled={isRegistrationsDisabled()}>Registrations</button>
                <button className={isPackagesDisabled() ? "btn-disabled" : ""} onClick={handleShowPackages} disabled={isPackagesDisabled()}>Packages</button>
                <button className={isPaymentsDisabled() ? "btn-disabled" : ""} onClick={handleShowPayments} disabled={isPaymentsDisabled()}>Payments</button>
            </div>
            <div className="order-menu-actions">
                {children}
            </div>
        </div>
    )
}

export default OrderMenu;