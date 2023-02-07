export default function insertionSort() {
    let arr = [...this.state.arr];
    let n = arr.length;
    let i = 1;
    let key, j;
    let incrementing;
    const TIMEOUT_INT = 10;

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
