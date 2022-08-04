const { Level } = require("level");

const db = new Level("database", { valueEncoding: "json" });

function App() {
    return <div>Electron React</div>;
}

export default App;
