import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css";


const API_URL = "https://bajaj-finserv-health-limited.onrender.com/bfhl"; 

function App() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: "numbers", label: "Numbers" },
        { value: "alphabets", label: "Alphabets" },
        { value: "highest_alphabet", label: "Highest Alphabet" }
    ];

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(input);
            if (!parsedData.data) throw new Error("Invalid JSON");

            const res = await axios.post(API_URL, parsedData);
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or API error");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>BFHL API Tester</h1>
            <textarea
                rows="5"
                cols="50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON (e.g., {"data":["A","1","B","2"]})'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <>
                    <h3>Select Data to Display:</h3>
                    <Select
                        options={options}
                        isMulti
                        onChange={(selected) => setSelectedOptions(selected.map((opt) => opt.value))}
                    />

                    <h3>Response:</h3>
                    <pre>
                        {JSON.stringify(
                            Object.fromEntries(
                                Object.entries(response).filter(([key]) =>
                                    selectedOptions.includes(key)
                                )
                            ),
                            null,
                            2
                        )}
                    </pre>
                </>
            )}
        </div>
    );
}

export default App;
