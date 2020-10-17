import React from 'react';
import numeral from "numeral";
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            <div className="tablein">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
            </div>
        </div>
    )
}

export default Table
