import React from "react";
import './BarGraph.css'

const ARRAY_LENGTH = 15;
const TIMEOUT_INT = 100;
const generateNewArray = () => { return Array.from({ length: ARRAY_LENGTH }, () => Math.floor(Math.random() * 100)) };
const PRIMARY_COLOR = 'black';
const SORTED_COLOR = 'red';
const HIGHLIGHT_COLOR = 'blue';


class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selected: this.props.selected,
            highlighted: this.props.highlighted
        };
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        const newState = {};
        if (nextProps.data !== prevProps.data) newState.data = nextProps.data;
        if (nextProps.selected !== prevProps.selected) newState.selected = nextProps.selected;
        if (nextProps.highlighted !== prevProps.highlighted) newState.highlighted = nextProps.highlighted;
        if (!newState.length) return newState;
        return null;
    }

    render() {
        return (<div
            // className={"bar" + (this.state.selected ? " selected" : "")}
            className="bar"
            value={String(this.state.data)}
            style={{
                height: String(this.state.data * 5) + 'px',
                backgroundColor: (
                    this.state.highlighted ? HIGHLIGHT_COLOR : (this.state.selected ? SORTED_COLOR : PRIMARY_COLOR)
                )
            }}
        >
        </div>)
    }
}

class BarGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [],
            selected: [],
            highlighted: [],
        }
    }

    componentDidMount() {
        const randomData = generateNewArray();
        this.setState({ arr: randomData });
    }

    refreshArray = () => {
        const newData = generateNewArray();
        const newSelected = new Array(ARRAY_LENGTH).fill(0);
        this.setState({ arr: newData, selected: newSelected });
    }

    // insertionSort = () => {
    //     let arr = [...this.state.arr];
    //     let n = arr.length;
    //     let i = 1;
    //     let key, j;

    //     const sortStep = () => {
    //         if (i < n) {
    //             key = arr[i];
    //             j = i - 1;

    //             /* Move elements of arr[0..i-1], that are 
    //             greater than key, to one position ahead 
    //             of their current position */
    //             while (j >= 0 && arr[j] > key) {
    //                 arr[j + 1] = arr[j];
    //                 j = j - 1;
    //             }
    //             arr[j + 1] = key;
    //             i++;

    //             // Update the state and schedule the next step
    //             let newSel = new Array(i).fill(1).concat(new Array(n - i).fill(0));
    //             this.setState({ arr: [...arr], selected: newSel }, () => setTimeout(sortStep, TIMEOUT_INT));
    //         }
    //     };

    //     // Schedule the first step
    //     setTimeout(sortStep, TIMEOUT_INT);
    // };

    insertionSort = () => {
        let arr = [...this.state.arr];
        let n = arr.length;
        let i = 1;
        let key, j;
        let incrementing;

        const incrementStep = () => {
            if (i < n) {
                if (!incrementing) {
                    key = arr[i];
                    j = i - 1;
                }

                if (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j = j - 1;
                    incrementing = true;

                    // Update the state and schedule the next step
                    let newSel = new Array(i).fill(1).concat(new Array(n - i).fill(0));
                    let newHigh = new Array(n).fill(0);
                    newHigh[i] = newHigh[j] = 1;
                    this.setState({ arr: [...arr], selected: newSel, highlighted: newHigh }, () => setTimeout(incrementStep, TIMEOUT_INT));
                } else {
                    arr[j + 1] = key;
                    i++;
                    incrementing = false;

                    // Update the state and schedule the next step
                    let newSel = new Array(i).fill(1).concat(new Array(n - i).fill(0));
                    let newHigh = new Array(n).fill(0);
                    newHigh[i] = newHigh[j] = 1;
                    this.setState({ arr: [...arr], selected: newSel, highlighted: newHigh }, () => setTimeout(incrementStep, TIMEOUT_INT));
                }
            }
        }

        // Schedule the first step
        setTimeout(incrementStep, TIMEOUT_INT);
    };



    render() {
        return (
            <div>
                <button onClick={this.refreshArray}> Refresh </button>
                <button onClick={this.insertionSort}> Insertion Sort </button>

                <div className="barFrame">
                    {
                        this.state.arr.map((item, index) => {
                            return <Bar highlighted={this.state.highlighted[index]} selected={this.state.selected[index]} data={item} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BarGraph;