import React from 'react';
import styled from 'styled-components';
import { pagesRef } from '../firebase';
import CandyIcon from './../assets/gfx/candy-machine-icon.svg';

const SelectionsContainer = styled.div`
  background: white;
  -webkit-box-shadow: 0px -2px 5px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px -2px 5px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px -2px 5px 0px rgba(153, 153, 153, 1);
  //   padding: 50px 0 0 0;
`;
const CandyMachine = styled.div`
  padding-top: 50px;
  background: url(${CandyIcon});
  background-repeat: no-repeat;
  background-position: bottom center;
  width: 100px;
  height: 100px;
  margin: auto;
`;
const Headline = styled.div`
  margin: auto;
  text-align: center;
  width: 600px;
  color: #cc1433;
  font-size: 40px;
  text-transform: uppercase;
  font-family: 'Candal', sans-serif;
`;
const Teaser = styled.div`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  margin: auto;
  width: 650px;
`;
const GridContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  background: white;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  justify-content: space-evenly;
  padding-bottom: 50px;
  @media (max-width: 1300px) {
    width: 900px;
  }
`;
const Product = styled.div`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 2px solid transparent;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 0 0 46px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 2px solid #f4ced4;
  }
`;

const ProductPreview = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 200px;
  }
`;
const ProductName = styled.div`
  text-align: center;
  color: #cc1433;
  font-size: 22px;
  font-family: 'Candal', sans-serif;
`;
const ProductPrice = styled.div`
  padding: 10px 0 0 0;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;
class Selections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionsData: [],
      candyProducts: [],
    };
    this.getHeaderData();
  }
  getHeaderData = async () => {
    // Get texts for Selections
    await pagesRef
      .doc('selections')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText: doc.data().teaserText,
          };
          this.setState({ selectionsData: data });
          console.log(this.state.selectionsData.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
    // Get selection products
    await pagesRef
      .doc('selections')
      .collection('products')
      .get()
      .then((product) => {
        product.forEach((doc) => {
          const product = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            productName: doc.data().productName,
            productPrice: doc.data().productPrice,
          };

          this.setState({
            candyProducts: [product, ...this.state.candyProducts],
          });
        });
      });
  };
  render() {
    const { title, teaserText } = this.state.selectionsData;
    const { candyProducts } = this.state;
    return (
      <React.Fragment>
        <SelectionsContainer>
          <CandyMachine></CandyMachine>
          <Headline>{title}</Headline>
          <Teaser>
            <div dangerouslySetInnerHTML={{ __html: teaserText }}></div>
          </Teaser>
          <GridContainer>
            {candyProducts.map((product) => (
              <Product key={product.id}>
                <ProductPreview>
                  <img src={product.imageUrl} alt="Candy Preview" />
                </ProductPreview>
                <ProductName>
                  <div>{product.productName}</div>
                </ProductName>
                <ProductPrice>
                  <div>{product.productPrice}</div>
                </ProductPrice>
              </Product>
            ))}
          </GridContainer>
        </SelectionsContainer>
      </React.Fragment>
    );
  }
}

export default Selections;
