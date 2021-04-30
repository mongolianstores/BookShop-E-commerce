import React from 'react'

const Delivery = () => {

    return(

        <div className='delivery'>

            <h2>Delivery information</h2>
            <p>Approximate delivery time and price are based on county/region.</p>

            <table>
                <thead>
                    <tr>
                        <th id='thead'>Country/Region</th>
                        <th id='thead'>Delivery time</th>
                        <th id='thead'>Delivery cost</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>EU</td>
                        <td>3-4 days</td>
                        <td>€10</td>
                    </tr>

                    <tr>
                        <td>Switzerland</td>
                        <td>3-4 days</td>
                        <td>€10</td>
                    </tr>

                    <tr>
                        <td>Norway</td>
                        <td>3-4 days</td>
                        <td>€10</td>
                    </tr>

                    <tr>
                        <td>UK</td>
                        <td>4-5 days</td>
                        <td>€15</td>
                    </tr>

                    <tr>
                        <td>USA</td>
                        <td>6-7 days</td>
                        <td>€20</td>
                    </tr>

                    <tr>
                        <td>Canada</td>
                        <td>6-7 days</td>
                        <td>€20</td>
                    </tr>
                    
                    <tr>
                        <td>Rest of the world</td>
                        <td>7-8 days</td>
                        <td>€25</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Delivery;