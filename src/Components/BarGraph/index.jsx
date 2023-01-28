import React from "react";
import './BarGraph.css'

const ARRAY_LENGTH = 50;
const TIMEOUT_INT = 5;
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
        const newHigh = new Array(ARRAY_LENGTH).fill(0);
        this.setState({ arr: newData, selected: newSelected, highlighted: newHigh });
    }

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
                    let newSel = new Array(i).fill(1).concat(new Array(n - i - 1).fill(0));
                    let newHigh = new Array(n).fill(0);
                    newHigh[i] = newHigh[j] = 1;
                    this.setState({ arr: [...arr], selected: newSel, highlighted: newHigh }, () => setTimeout(incrementStep, TIMEOUT_INT));
                } else {
                    arr[j + 1] = key;
                    i++;
                    incrementing = false;

                    // Update the state and schedule the next step
                    let newSel = new Array(i).fill(1).concat(new Array(n - i - 1).fill(0));
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
                <div className="buttonBar">
                    <div className="configButtons">
                        <button onClick={this.refreshArray}> Refresh </button>
                    </div>
                    <div className="algoButtons">
                        <button onClick={this.insertionSort}> Insertion Sort </button>
                    </div>
                </div>
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