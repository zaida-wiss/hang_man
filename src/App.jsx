import Header from "./Header";
import Dashboard from "./Dashboard";
import "./App.css";

const App = () => {
  return (
    <div style={{backgroundColor: "red", minHeight: "100vh"}}>
      <Dashboard title="Hänga gubbe"/>
      <Header title="Snälla... hejja på mig!"/>
    </div>
  );
};

export default App;
