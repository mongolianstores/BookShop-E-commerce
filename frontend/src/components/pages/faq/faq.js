import React from 'react'

const FAQ = () => {

    return(

        <div className='faq'>

            <h2>FAQ</h2><br/>

            <ul>
                <li>
                    <h3 id='q'>QUESTION: How to place order?</h3>
                    <h3>ANSWER: Add books to cart and in cart, make payment with paypal.</h3>
                </li>

                <li>
                    <h3 id='q'>QUESTION: How to get information about the order?</h3>
                    <h3>ANSWER: In " Your orders" section, click details.</h3>
                </li>

                <li>
                    <h3 id='q'>QUESTION: When my order will be delivered?</h3>
                    <h3>ANSWER: Approximate delivery time is available in "Delivery section".</h3>
                </li>

                <li>
                    <h3 id='q'>QUESTION: Can I use gift check?</h3>
                    <h3>ANSWER: No, gift checks are not accepted.</h3>
                </li>
                
                <li>
                    <h3 id='q'>QUESTION: How can I cancel my order?</h3>
                    <h3>ANSWER: Contact customer service for cancelling order.</h3>
                </li>
            </ul>
        </div>
    )
}

export default FAQ;