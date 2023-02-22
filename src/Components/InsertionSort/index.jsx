import React from "react";
import '../Components.css';
import Bar from "../Bar";
import insertionSort from "../../algorithms/insertionSort";

const ARRAY_LENGTH = 50;
const TIMEOUT_INT = 10;
const generateNewArray = () => { return Array.from({ length: ARRAY_LENGTH }, () => Math.floor(Math.random() * 100)) };

class InsertionSort extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [],
            sorted: [],
            highlighted: [],
        }
        this.insertionSort = insertionSort.bind(this);
    }

    componentDidMount() {
        const randomData = generateNewArray();
        this.setState({ arr: randomData });
    }

    refreshArray = () => {
        const newData = generateNewArray();
        const newSorted = new Array(ARRAY_LENGTH).fill(0);
        const newHigh = new Array(ARRAY_LENGTH).fill(0);
        this.setState({ arr: newData, sorted: newSorted, highlighted: newHigh });
    }

    render() {
        return (
            <div>
                <div className="buttonBar">
                    <div className="configButtons">
                        <button className="button-27" onClick={this.refreshArray}> Refresh </button>
                    </div>
                    <div className="algoButtons">
                        <button className="button-27" onClick={this.insertionSort}> Insertion Sort </button>
                    </div>
                </div>
                <div className="barFrame">
                    {
                        this.state.arr.map((item, index) => {
                            return <Bar highlighted={this.state.highlighted[index]} sorted={this.state.sorted[index]} data={item} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default InsertionSort;