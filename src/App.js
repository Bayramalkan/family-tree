import { useEffect, useRef, useState } from "react";
import "../src/App.css";
import { Grid, TextField, Item } from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
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
    // {
    //   id: 1,
    //   name: "Emre",
    //   surname: "Yıldız",
    //   father: null,
    //   mother: null,
    // },
    {
      id: 2,
      name: "Bayram",
      surname: "Alkan",
      father: [
        {
          id: 1,
          name: "Erkan",
          surname: "Alkan",
        },
      ],
      mother: [
        {
          id: 1,
          name: "Fadime",
          surname: "Alkan",
        },
      ],

      siblings: [
        {
          id: 1,
          name: "Mehmet",
          surname: "Alkan",
          father: [
            {
              id: 1,
              name: "Erkan",
              surname: "Alkan",
            },
          ],
        },
        {
          id: 2,
          name: "Emre",
          surname: "Alkan",
          father: [
            {
              id: 1,
              name: "Erkan",
              surname: "Alkan",
            },
          ],
        },
      ],
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

            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="BABA ADI"
                  variant="outlined"
                  onChange={(e) => {
                    setFather(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="BABA TC"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="ANNE ADI"
                  variant="outlined"
                  onChange={(e) => {
                    setMother(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="ANNE TC"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="content-container">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="content"
                style={{
                  marginLeft: "150px",
                }}
              >
                <div className="content-wrapper">
                  <div className="parents">
                    <div
                      className={item.father ? `content-item__father` : "dpn"}
                      onClick={() => {
                        setName(item.father[0].name);
                        toggleMenu();
                      }}
                    >
                      {item.father?.map((item, index) => {
                        return (
                          <div key={index}>
                            {item.name} {item.surname}
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className={item.mother ? `content-item__mother` : "dpn"}
                      onClick={() => {
                        setName(item.mother[0].name);
                        toggleMenu();
                      }}
                    >
                      {item.mother?.map((item, index) => {
                        return (
                          <div key={index}>
                            {item.name} {item.surname}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {item.father && (
                    <ArrowUpwardIcon
                      style={{
                        fontSize: "50px",
                      }}
                    />
                  )}
                  <div
                    className="content-item"
                    onClick={() => {
                      setName(item.name);
                      toggleMenu();
                    }}
                  >
                    <div className="content-item__name">
                      {item.name} {item.surname}
                    </div>

                    <div className="dpf">
                      {item.siblings?.map((item, index) => {
                        return (
                          <div
                            className={
                              item.father ? `content-item__sibling ` : "dpn"
                            }
                            key={index}
                          >
                            {item.name}
                            {item.surname}
                          </div>
                        );
                      })}
                    </div>
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
