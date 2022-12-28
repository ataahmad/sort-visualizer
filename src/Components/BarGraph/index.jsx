import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import './BarGraph.css'
/*
Bar Graph component:
props
    - Should have an array property which holds all values for bars
    - Should take in an array length to indicate how many bars we are working with.
    - Should have a method that resets the array to a new one

Create a function called switch, and a state called switch that has a value of an
integer from 0 too n.
Create a button that on click, changes the value of the switch state to a new random
number between 0 and n.
Create a useEffect function that targets the 0th element and the ith element (i being
    the new random number that was generated and changes the state of the switch state)
    and switches them.
*/


const BarGraph = () => {

    const [array, setArray] = useState([]);
    const [ARR_LENTGH, setLength] = useState(10);
    const [WINDOW_HEIGHT, setHeight] = useState(100);
    const [refresh, refreshArray] = useState(true);
    const [selected, changeSelected] = useState(0);
    const [executed, execution] = useState(false);

    useEffect(() => {
        const newArray = [];
        for (let i = 0; i < ARR_LENTGH; i++) {
            newArray.push(Math.floor(Math.random() * WINDOW_HEIGHT) + 1)
        }
        setArray(newArray);
    }, [refresh]);

    useEffect(() => {
        insertionSort();
    }, [executed]);

    // Function to sort an array using insertion sort
    const insertionSort = () => {
        let arr = array;
        let n = array.length;
        let i, key, j;
        for (i = 1; i < n; i++) {
            key = arr[i];
            changeSelected(key);
            j = i - 1;

            /* Move elements of arr[0..i-1], that are 
            greater than key, to one position ahead 
            of their current position */
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                let newArr = [...arr];
                console.log(newArr);
                setArray(newArr);
            }
            arr[j + 1] = key;
        }
    }


    return (
        <div>
            <button onClick={() => {
                let newRefresh = !refresh;
                refreshArray(newRefresh);
            }}> Refresh </button>
            <button onClick={() => {
                let newArr = [...array];
                let temp = newArr[0];
                newArr[0] = newArr[3];
                newArr[3] = temp;
                setArray(newArr);
            }}>
                Switch
            </button>
            <button onClick={() => {
                let newExecution = !executed;
                execution(newExecution);
            }}>
                Insertion Sort
            </button>
            <div className="barFrame">
                {
                    array.map((val, ind) => {
                        return (<div
                            className={"bar" + (ind == selected ? " selected" : "")}
                            refer={String(ind)}
                            style={{ height: String(val * 5) + 'px' }}
                        >
                            {val}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}



export default BarGraph;