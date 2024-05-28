import { useState } from "react";
const useCounter = () => {
    const [counter, setcounter] = useState(0);

    const increment = () => {
        setcounter (counter + 1);
    }
    return {counter, increment}
}
export default useCounter;