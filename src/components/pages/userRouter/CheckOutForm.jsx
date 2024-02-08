import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import { AuthContext } from '../../provider/AuthProvider';

const CheckOutForm = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [cart] = useCart();
    const [clientSecret, setClientSecret] = useState('');
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)



    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        });

        if (confirmError) {
            console.log("confirm error");
        }
        else {
            console.log(paymentIntent);
        }

    }



    return (
        <div className='w-3/4 mx-auto mt-20'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button disabled={!stripe || !clientSecret} className='bg-[#47FC22] hover:bg-[#47FC22] px-3 py-2 rounded-md mt-5 text-xl font-semibold text-white' type="submit">
                    Pay
                </button>
                <p className='text-red-600'>{error}</p>
            </form>
        </div>
    );
};

export default CheckOutForm;