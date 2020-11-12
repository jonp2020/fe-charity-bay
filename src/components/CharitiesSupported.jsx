import React, { Component } from "react";
import axios from "axios";

export default class CharitiesSupported extends Component {
  state = {
    charities: [],
    isLoading: true,
  };

  componentDidMount = () => {
    axios
      .get("https://charity-bay-be.herokuapp.com/api/charities")
      .then(({ data }) => {
        this.setState({ charities: data, isLoading: false });
      });
  };

  render() {
    if (this.state.isLoading) return <p>Loading charities</p>;
    console.log("here in chariteis", this.state.charities);
    console.log("isLoading", this.state.isLoading);
    const { charities } = this.state;
    console.log("charities", charities);

    return (
      <>
        <div>Hi from Charities</div>
        <ul>
          {charities.map((charity) => {
            console.log("map chairty", charity);
            return (
              <section key={charity.charity_id}>
                <li>{charity.description}</li>;
              </section>
            );
          })}
        </ul>
      </>
    );
  }
}

// export default function CharitiesSupported() {
//   const [charities, setCharities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://charity-bay-be.herokuapp.com/api/charities")
//       .then(({ data }) => {
//         console.log("result of data", data);
//         setCharities();
//         console.log("charities", charities);
//       })
//       .then(() => {
//       });
//   }, []);

//   return (
//     <div>

//       <h1>Current list of charities you can donate to.</h1>
//       <div>IMAGE</div>
//       <p>Charities here:</p>
//       <button>Show more</button>
//       <p>Further details of charity</p>
//       <button>Show less</button>
//     </div>
//   );
// }
