import React from "react";
import './BarGraph.css'


// Function to sort an array using insertion sort
async function insertionSort(arr, n) {
    let i, key, j;
    for (i = 1; i < n; i++) {
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
    }
}

const generateNewArray = () => {return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))};


class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    render() {
        return (<div
            className="bar"
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
            arr: []
        }
    }

    componentDidMount() {
        const randomData = generateNewArray();
        this.setState({ arr: randomData });
    }

    refreshArray = () => {
        const newData = generateNewArray();
        this.setState({ arr: newData });
    }

    render() {
        return (
            <div>
                <button onClick={this.refreshArray}> Refresh </button>
                <button>
                    Insertion Sort
                </button>
                <div className="barFrame">
                    {
                        this.state.arr.map(item => {
                            return <Bar data={item} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BarGraph;