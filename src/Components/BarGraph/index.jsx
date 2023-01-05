import React from "react";
import './BarGraph.css'

const ARRAY_LENGTH = 100;
const TIMEOUT_INT = 100;
const generateNewArray = () => { return Array.from({ length: ARRAY_LENGTH }, () => Math.floor(Math.random() * 100)) };

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selected: this.props.selected
        };
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        const newState = {};
        if (nextProps.data !== prevProps.data) newState.data = nextProps.data;
        if (nextProps.selected !== prevProps.selected) newState.selected = nextProps.selected;
        if (!newState.length) return newState;
        return null;
    }

    render() {
        return (<div
            className={"bar" + (this.state.selected ? " selected" : "")}
            value={String(this.state.data)}
            style={{ height: String(this.state.data * 5) + 'px' }}
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

    insertionSort = () => {
        let arr = [...this.state.arr];
        let n = arr.length;
        let i = 1;
        let key, j;

        const sortStep = () => {
            if (i < n) {
                key = arr[i];
                j = i - 1;

                /* Move elements of arr[0..i-1], that are 
                greater than key, to one position ahead 
                of their current position */
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j = j - 1;
                }
                arr[j + 1] = key;
                i++;

                // Update the state and schedule the next step
                let newSel = new Array(i).fill(1).concat(new Array(n - i).fill(0));
                this.setState({ arr: [...arr], selected: newSel }, () => setTimeout(sortStep, TIMEOUT_INT));
            }
        };

        // Schedule the first step
        setTimeout(sortStep, TIMEOUT_INT);
    };



    render() {
        return (
            <div>
                <button onClick={this.refreshArray}> Refresh </button>
                <button onClick={this.insertionSort}> Insertion Sort </button>

                <div className="barFrame">
                    {
                        this.state.arr.map((item, index) => {
                            return <Bar selected={this.state.selected[index]} data={item} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BarGraph;