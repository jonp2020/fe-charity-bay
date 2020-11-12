// import React, { Component } from "react";
import React from "react";
import axios from "axios";
import CharityInfo from './CharityInfo';

export default class CharitiesSupported extends React.Component {
  state = {
    charities: [],
    charityShowMore: "",
    isLoading: true,
  };

  componentDidMount = () => {
    axios
      .get("https://charity-bay-be.herokuapp.com/api/charities")
      .then(({ data: { charities } }) => {
        this.setState({ charities: charities, isLoading: false });
      });
  };


  // componentDidUpdate(prevState, currentState) {
  //   if(prevState.charityShowMore !== currentState.charityShowMore)
  //   this.setState({
  //             charityShowMore: "",
  //   })
  // }

  render() {
    if (this.state.isLoading) return <p>Loading charities</p>;
    console.log("isLoading", this.state.isLoading);
    const { charities } = this.state;
    console.log("charities", charities);

    return (
      <>
          {charities.map((charity) => {
            console.log("map chairty", charity);
            return <CharityInfo key={charity.charity_id} charity={charity}/>
          })}
      </>
    );
  }
}

// export default function CharitiesSupported() {
//   const [charitiesData, setCharitiesData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://charity-bay-be.herokuapp.com/api/charities")
//       .then(({ data: { charities } }) => {
//         console.log("result of data", charities);
//         // setCharitiesData(charities);
//         console.log("charities", charitiesData);
//       })
//       .then(() => {});
//   });

//   return (
//     <div>
//       <h1>Current list of charities you can donate to.</h1>
//       <div>IMAGE</div>
//       <p>Charities here: {}</p>
//       <button>Show more</button>
//       <p>Further details of charity</p>
//       <button>Show less</button>
//     </div>
//   );
// }
