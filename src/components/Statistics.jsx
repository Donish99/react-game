import React, {useEffect, useState} from "react";

const Statistics = (props) =>{
    const [data, setData] = useState([]);
    const handleResetStats = () => {
        localStorage.removeItem('scoreBoard');
        setData([])
    }

    useEffect(() => {
        let tmp;
        let ls = localStorage.getItem('scoreBoard');
        if(ls !== null){
            ls = ls.split(',')
            if(ls.length >= 10) {
                while(ls.length  !== 10){
                    ls.shift()
                }
            }
            setData(ls)
            localStorage.setItem('scoreBoard', ls.toString())
        }
    }, [props.gameOver])

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
                {data.map((el, index) => {

                    return el !== "null" ?
                        (<tr key={index}>
                            <td>{index}</td>
                            <td>{el}</td>
                        </tr>)
                    : null
                })}
                </tbody>
            </table>
    </>
    )
}

export default Statistics