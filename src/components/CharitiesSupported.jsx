import React from "react";
import axios from "axios";
import CharityInfo from "./CharityInfo";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class CharitiesSupported extends React.Component {
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

  render() {
    const { charities, isLoading } = this.state;
    const { classes } = this.props;
    return (
      <div className="charityCardContainer">
        {isLoading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            {charities.map((charity) => {
              return <CharityInfo key={charity.charity_id} charity={charity} />;
            })}
          </>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CharitiesSupported);
