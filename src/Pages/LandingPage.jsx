import React, { Component } from "react";
import ItemsListCard from "../components/ItemsListCard";
import axios from "axios";
import Pagination from "../components/Pagination";
import { navigate } from "@reach/router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const DropdownContainer = styled("div")``;

const DropdownListContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownHeader = styled("div")`
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin: 0 0.8rem 0.6rem 0.8rem;
  padding: 12px;
  width: 6.1rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
  &:hover {
    background-color: #d4a373;
    color: #fff;
  }
`;

const DropdownListOption = styled("ul")`
  position: absolute;
  background-color: #faedcd;
  margin-top: -0.758rem;
  width: 6.1rem;
  border-radius: 0 0 6px 6px;
`;

const ListItemOption = styled("li")`
  list-style: none;
  font-size: 0.8rem;
  padding: 0.5rem;

  &:hover {
    background-color: #ccd5ae;
  }
  &:last-child:hover {
    border-radius: 0 0 6px 6px;
  }
`;

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class LandingPage extends Component {
  state = {
    items: [],
    page: 1,
    isLoading: true,
    categoryMenuOpen: false,
    order: "desc",
    category: undefined,
    categoryText: "Categories",
    sortBy: "thumbnail_img_ref",
    sortByDateOrPriceMenuText: "Sort by",
    hoveredHeader: "nonHoveredHeader",
    ulHover: "noShowUl",

    sortByMenuOpen: false,
    hoveredSortByHeader: "nonHoveredSortByHeader",
    sortByUlHover: "noShowSortByUlHover",

    orderByMenuOpen: false,
    orderByAgeOrValue: "Order by",
    hoveredOrderByHeader: "nonHoveredOrderHeader",
  };

  componentDidMount() {
    const { page } = this.state;
    return axios
      .get(
        `https://charity-bay-be.herokuapp.com/api/items?p=${page}&status=available`
      )
      .then(({ data: { items, itemCount } }) => {
        this.setState({ items, itemCount, isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, order, category, sortBy } = this.state;
    if (
      prevState.page !== page ||
      prevState.order !== order ||
      prevState.category !== category ||
      prevState.sortBy !== sortBy
    ) {
      return axios
        .get("https://charity-bay-be.herokuapp.com/api/items", {
          params: {
            p: page,
            order: order,
            category,
            sortBy,
            status: "available",
          },
        })
        .then(({ data: { items, itemCount } }) => {
          this.setState({ items, itemCount, isLoading: false });
        });
    }
  }

  toggleDropdownCategory = (e) => {
    if (e === "click" && this.state.ulHover === "noShowUl") {
      this.setState((prevState) => ({
        categoryMenuOpen: !prevState.categoryMenuOpen,
        ulHover: "showUl",
      }));
    }
    if (e === "click" && this.state.ulHover === "showUl") {
      this.setState((prevState) => ({
        categoryMenuOpen: !prevState.categoryMenuOpen,
        ulHover: "noShowUl",
      }));
    }
  };

  mouseOverCategoryUl = (e) => {
    console.log("here in mouseover", e);
    if (e === "in-ul") {
      console.log("here in mouse over cat if statment");
      this.setState({ ulHover: "showUl", hoveredHeader: "hoveredHeader" });
    }
  };

  mouseOutCategoryUl = (e) => {
    if (e === "out-ul") {
      console.log("here in if out statement");
      this.setState((prevState) => ({
        categoryMenuOpen: !prevState.categoryMenuOpen,
        ulHover: "noShowUl",
        hoveredHeader: "nonHoveredHeader",
      }));
    }
  };

  toggleDropdownSortBy = (e) => {
    console.log("here in sort by toggle", e);
    if (e === "click") {
      this.setState((prevState) => ({
        sortByMenuOpen: !prevState.sortByMenuOpen,
      }));
    }
  };

  mouseOverSortByUl = (e) => {
    console.log("here in mouseover", e);
    if (e === "in-ul") {
      console.log("here in mouse over cat if statment");
      this.setState({ hoveredSortByHeader: "hoveredSortByHeader" });
    }
  };

  mouseOutSortByUl = (e) => {
    if (e === "out-ul") {
      console.log("here in sort by if out statement");
      this.setState((prevState) => ({
        sortByMenuOpen: !prevState.sortByMenuOpen,
        hoveredSortByHeader: "nonHoveredSortByHeader",
      }));
    }
  };

  toggleDropdownOrderBy = (e) => {
    console.log("here in toggle order", e);
    if (e === "click") {
      this.setState((prevState) => ({
        orderByMenuOpen: !prevState.orderByMenuOpen,
      }));
    }
  };

  mouseOverOrderByUl = (e) => {
    console.log("here in mouseover", e);
    if (e === "in-ul") {
      console.log("here in mouse over cat if statment");
      this.setState({ hoveredOrderByHeader: "hoveredOrderHeader" });
    }
  };

  mouseOutOrderByUl = (e) => {
    if (e === "out-ul") {
      console.log("here in sort by if out statement");
      this.setState((prevState) => ({
        orderByMenuOpen: !prevState.orderByMenuOpen,
        hoveredOrderByHeader: "nonHoveredOrderHeader",
      }));
    }
  };

  handleFilter = (e) => {
    console.log(e);
    if (e !== "All") {
      this.setState({
        category: e,
        categoryMenuOpen: false,
        categoryText: e,
        hoveredHeader: "nonHoveredHeader",
      });
    } else {
      this.setState({
        category: undefined,
        categoryMenuOpen: false,
        categoryText: "Categories",
        hoveredHeader: "nonHoveredHeader",
      });
    }
  };

  handleSort = (e) => {
    console.log("handlesort: ", e);
    if (e === "price") {
      this.setState({
        sortBy: e,
        order: "desc",
        orderByAgeOrValue: "Highest",
        categoryMenuSortOpen: false,
        sortByDateOrPriceMenuText: "Price",
      });
    }
    if (e === "thumbnail_img_ref") {
      this.setState({
        sortBy: e,
        order: "desc",
        orderByAgeOrValue: "Most recent",
        categoryMenuSortOpen: false,
        sortByDateOrPriceMenuText: "Date posted",
      });
    }
  };

  handleOrderAge = (e) => {
    console.log(e);
    if (e === "Most recent") {
      this.setState({ orderByAgeOrValue: e, order: "desc" });
    }
    if (e === "Oldest") {
      this.setState({ orderByAgeOrValue: e, order: "asc" });
    }
  };

  handleOrderPrice = (e) => {
    console.log(e);
    if (e === "Highest") {
      this.setState({ orderByAgeOrValue: e, order: "desc" });
    }
    if (e === "Lowest") {
      this.setState({ orderByAgeOrValue: e, order: "asc" });
    }
  };

  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  render() {
    const { items, itemCount, page, sortBy, isLoading } = this.state;
    const { classes } = this.props;
    const articlesPerPage = 10;
    const pageCount = Math.ceil(itemCount / articlesPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
    return (
      <section className="main-section-container">
        {isLoading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="navigationButtons">
            <div className="navigationButtons-first-div">
              <button
                className="howItWorks-btn"
                onClick={() => {
                  navigate("/about");
                }}
              >
                How it works
              </button>

              <button
                onClick={() => {
                  navigate("/post_item");
                }}
              >
                Sell an item
              </button>
            </div>
            <div className="sort-data-items-wrapper">
              <DropdownContainer>
                <DropdownHeader
                  onClick={() => this.toggleDropdownCategory("click")}
                  onMouseLeave={() => {
                    if (this.state.categoryMenuOpen) {
                      this.setState({
                        hoveredHeader: "hoveredHeader",
                      });
                    } else
                      this.setState({
                        hoveredHeader: "nonHoveredHeader",
                      });
                  }}
                  className={this.state.hoveredHeader}
                >
                  {this.state.categoryText}
                </DropdownHeader>
                {this.state.categoryMenuOpen && (
                  <DropdownListContainer>
                    <DropdownListOption
                      className={this.state.ulHover}
                      onMouseOver={() => this.mouseOverCategoryUl("in-ul")}
                      onMouseLeave={() => this.mouseOutCategoryUl("out-ul")}
                    >
                      {this.state.category !== undefined && (
                        <ListItemOption
                          onClick={() => this.handleFilter("All")}
                        >
                          All categories
                        </ListItemOption>
                      )}
                      {this.state.category !== "Toys" && (
                        <ListItemOption
                          value="Toys"
                          name="Toys"
                          onClick={() => this.handleFilter("Toys")}
                        >
                          Toys
                        </ListItemOption>
                      )}
                      {this.state.category !== "Clothes" && (
                        <ListItemOption
                          value="Clothes"
                          onClick={() => this.handleFilter("Clothes")}
                        >
                          Clothes
                        </ListItemOption>
                      )}
                      {this.state.category !== "Kitchenware" && (
                        <ListItemOption
                          value="Kitchenware"
                          onClick={() => this.handleFilter("Kitchenware")}
                        >
                          Kitchenware
                        </ListItemOption>
                      )}
                      {this.state.category !== "Books" && (
                        <ListItemOption
                          value="Books"
                          onClick={() => this.handleFilter("Books")}
                        >
                          Books
                        </ListItemOption>
                      )}
                      {this.state.category !== "Garden" && (
                        <ListItemOption
                          value="Garden"
                          onClick={() => this.handleFilter("Garden")}
                        >
                          Garden
                        </ListItemOption>
                      )}
                      {this.state.category !== "Electronics" && (
                        <ListItemOption
                          value="Electronics"
                          onClick={() => this.handleFilter("Electronics")}
                        >
                          Electronics
                        </ListItemOption>
                      )}
                      {/* </select> */}
                    </DropdownListOption>
                  </DropdownListContainer>
                )}
              </DropdownContainer>
              <DropdownContainer>
                <DropdownHeader
                  onClick={() => this.toggleDropdownSortBy("click")}
                  onMouseLeave={() => {
                    if (this.state.sortByMenuOpen) {
                      this.setState({
                        hoveredSortByHeader: "hoveredSortByHeader",
                      });
                    } else
                      this.setState({
                        hoveredSortByHeader: "nonHoveredSortByHeader",
                      });
                  }}
                  className={this.state.hoveredSortByHeader}
                >
                  {this.state.sortByDateOrPriceMenuText}
                </DropdownHeader>
                {this.state.sortByMenuOpen && (
                  <DropdownListContainer>
                    <DropdownListOption
                      onMouseOver={() => this.mouseOverSortByUl("in-ul")}
                      onMouseLeave={() => this.mouseOutSortByUl("out-ul")}
                    >
                      {this.state.sortByDateOrPriceMenuText !== "Date" && (
                        <ListItemOption
                          onClick={() => this.handleSort("thumbnail_img_ref")}
                          value="thumbnail_img_ref"
                        >
                          Date posted
                        </ListItemOption>
                      )}
                      {this.state.sortByDateOrPriceMenuText !== "Price" && (
                        <ListItemOption
                          onClick={() => this.handleSort("price")}
                          value="price"
                        >
                          Price
                        </ListItemOption>
                      )}
                    </DropdownListOption>
                  </DropdownListContainer>
                )}
              </DropdownContainer>

              <DropdownContainer>
                <DropdownHeader
                  onClick={() => this.toggleDropdownOrderBy("click")}
                  onMouseLeave={() => {
                    if (this.state.orderByMenuOpen) {
                      this.setState({
                        hoveredOrderByHeader: "hoveredOrderHeader",
                      });
                    } else
                      this.setState({
                        hoveredOrderByHeader: "nonHoveredOrderHeader",
                      });
                  }}
                  className={this.state.hoveredOrderByHeader}
                >
                  {this.state.orderByAgeOrValue}
                </DropdownHeader>

                {this.state.orderByMenuOpen && sortBy === "thumbnail_img_ref" && (
                  <DropdownListContainer>
                    <DropdownListOption
                      onMouseOver={() => this.mouseOverOrderByUl("in-ul")}
                      onMouseLeave={() => this.mouseOutOrderByUl("out-ul")}
                    >
                      {this.state.orderByAgeOrValue !== "Most recent" && (
                        <ListItemOption
                          value="desc"
                          onClick={() => this.handleOrderAge("Most recent")}
                        >
                          Most recent
                        </ListItemOption>
                      )}
                      {this.state.orderByAgeOrValue !== "Oldest" && (
                        <ListItemOption
                          value="asc"
                          onClick={() => this.handleOrderAge("Oldest")}
                        >
                          Oldest
                        </ListItemOption>
                      )}
                    </DropdownListOption>
                  </DropdownListContainer>
                )}

                {this.state.orderByMenuOpen && sortBy === "price" && (
                  <DropdownListContainer>
                    <DropdownListOption
                      onMouseOver={() => this.mouseOverOrderByUl("in-ul")}
                      onMouseLeave={() => this.mouseOutOrderByUl("out-ul")}
                    >
                      {this.state.orderByAgeOrValue !== "Highest" && (
                        <ListItemOption
                          value="desc"
                          onClick={() => this.handleOrderPrice("Highest")}
                        >
                          Highest
                        </ListItemOption>
                      )}
                      {this.state.orderByAgeOrValue !== "Lowest" && (
                        <ListItemOption
                          value="asc"
                          onClick={() => this.handleOrderPrice("Lowest")}
                        >
                          Lowest
                        </ListItemOption>
                      )}
                    </DropdownListOption>
                  </DropdownListContainer>
                )}
              </DropdownContainer>
            </div>
          </div>
        )}
        {items.map((item) => {
          return <ItemsListCard key={item.item_id} item={item} />;
        })}
        {!isLoading && (
          <Pagination
            page={page}
            atStart={atStart}
            atEnd={atEnd}
            pages={pages}
            changePage={this.changePage}
          />
        )}
      </section>
    );
  }
}

export default withStyles(styles)(LandingPage);
