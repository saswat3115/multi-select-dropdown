import './App.scss';
import Dropdown, { OptionType } from './Dropdown/Dropdown';

const OPTIONS: Array<OptionType> = [
  {
    key: "education",
    value: "Education 🎓"
  },
  {
    key: "arts",
    value: "Arts 🎏"
  },
  {
    key: "sports",
    value: "Sports ⚽"
  },
  {
    key: "games",
    value: "Games 💻"
  },
  {
    key: "health",
    value: "Health 🥤"
  }
];

function App() {
  return (
    <div className="App">
      <Dropdown
        options={OPTIONS}
        onItemSelect={(console.log)}
      />
    </div>
  );
}

export default App;
