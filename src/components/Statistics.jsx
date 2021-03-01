import React, {useEffect, useState} from "react";

const Statistics = () =>{
    let data = localStorage.getItem('scoreBoard') || [];
    console.log(data)

    const handleResetStats = () => {
        localStorage.removeItem('highestScore');
        localStorage.removeItem('scoreBoard');
    }

    return (
        <>
            <button style={{width: "100%"}} className={'btn btn-danger'} onClick={() => handleResetStats()}>Clear Stats</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {/*{data.map((el, index) => {*/}

                {/*    return el !== "null" ?*/}
                {/*        (<tr key={index}>*/}
                {/*            <td>{index}</td>*/}
                {/*            <td>{el}</td>*/}
                {/*        </tr>)*/}
                {/*    : null*/}
                {/*})}*/}
                </tbody>
            </table>
    </>
    )
}

export default Statistics