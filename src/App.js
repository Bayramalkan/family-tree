import { useEffect, useRef, useState } from "react";
import "../src/app.css";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState("inactive");
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
        console.log(menuRef.current);
      }
      setIsMenuOpen("inactive");
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMenuOpen(isOpen ? "active" : "inactive");
    console.log(isMenuOpen);
  };

  const data = [
    {
      id: 1,
      name: "Bayram",
      surname: "Alkan",
      father: null,
      mother: null,
    },
    {
      id: 2,
      name: "Mehmet",
      surname: "Alkan",
      father: 1,
      mother: 1,
    },
  ];

  return (
    <div className="App">
      <div className="menu-container">
        <div
          ref={menuRef}
          className={`sidebar-menu ${isOpen ? "active" : "inactive"}`}
        >
          <div className="menu">
            <h2>{name}</h2>
            <ul>
              <li>
                BABA ADI{" "}
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setFather(e.target.value);
                  }}
                />
              </li>
              <li>
                BABA TC <input type="number" name="" id="" />
              </li>
              <li>
                ANNE ADI{" "}
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setMother(e.target.value);
                  }}
                />
              </li>

              <li>
                ANNE TC <input type="number" name="" id="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="content-container" onClick={toggleMenu}>
          {data.map((item, index) => {
            return (
              <div key={index} className="content">
                <div className="content-item">
                  <div
                    className="content-item__name"
                    onClick={() => {
                      setName(item.name);
                    }}
                  >
                    {item.name} {item.surname}
                  </div>
                  <div className="content-item__father">
                    {father ? father : " BABA BULUNAMADI"}
                    {mother ? mother : " ANNE BULUNAMADI"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
