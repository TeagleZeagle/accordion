import { useState } from "react";
import data from "./data";
import './style.css';

export default function Accordion() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(currentId) {
        setSelected(currentId === selected ? null : currentId);
    }

    function handleMultiSelection(currentId) {
        const cpyMultiple = [...multiple];
        const indexOfCurrentId = cpyMultiple.indexOf(currentId);

        if (indexOfCurrentId === -1) {
            cpyMultiple.push(currentId);
        } else {
            cpyMultiple.splice(indexOfCurrentId, 1);
        }

        setMultiple(cpyMultiple);
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item" key={dataItem.id}>
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () => handleMultiSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {(selected === dataItem.id || multiple.includes(dataItem.id)) && (
                                <div className="content">{dataItem.answer}</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No data found!</div>
                )}
            </div>
        </div>
    );
}
