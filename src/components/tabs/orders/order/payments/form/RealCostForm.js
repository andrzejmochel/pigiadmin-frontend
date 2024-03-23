import React, {useEffect, useState} from "react";
import ordersApiService from "../../../../../../api/orders/orders.api.service";
import toast from "react-hot-toast";

const RealCostForm = ({onSubmit, payment}) => {

    const [orderPackagePayments, setOrderPackagePayments] = useState([]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchPayment = async () => {
            const result = await toast.promise(ordersApiService.getPayment(payment.orderId, payment.registrationId),
                {
                    loading: 'Loading payment data ...',
                    success: 'Loaded',
                    error: 'error'
                }
            )
            const packages = result.content.orderPackages.map((p, idx) => {
                const packageName = p.name ? p.name : `Paczka ${idx}}`
                return {
                    name: packageName,
                    realCost: 0.0
                }
            })
            setOrderPackagePayments(packages)
        };
        fetchPayment();
    }, [payment]);
    const calculateRealCost = () => {
        return orderPackagePayments.reduce((total, p) => total + parseFloat(p.realCost), 0.0);
    };

    const validateRealCost = () => {
        return orderPackagePayments.every(p => p.realCost > 0);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateRealCost()) {
            onSubmit({realCost: calculateRealCost(), paymentId: payment.id, summary: summary})
        } else {
            toast.error('Not all packages has real cost provided');
        }
    };

    const handleChange = (index, value) => {
        const payments = [...orderPackagePayments];
        payments[index].realCost = value;
        setOrderPackagePayments(payments);
    };
    return (
        <div>
            <h2>Provide real cost</h2>
            <form onSubmit={handleSubmit} className="pigi-form">
                <div className="form-group">
                    <label>Packages :</label>
                    <table className="pigi-table">
                        <thead>
                        <tr>

                            <th>Name</th>
                            <th>Real cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderPackagePayments.map((pack, index) => (
                            <tr key={index}>
                                <td>{pack.name}</td>
                                <td><input type="number" value={pack.realCost}
                                           onChange={(e) => handleChange(index, e.target.value)}
                                           step="0.01"
                                           className="small-input"/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Email summary:</label>
                    <textarea id="summary" cols={50} rows={6} value={summary}
                              onChange={(e) => setSummary(e.target.value)}/>
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RealCostForm;