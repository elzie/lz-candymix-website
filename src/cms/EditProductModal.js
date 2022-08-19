import React from 'react';
import { db } from '../firebase';
import styled from 'styled-components';
// import TextareaAutosize from 'react-autosize-textarea';

const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-evenly;
`;

const EditArea = styled.div`
  // width: 250px;
  padding: 0 10px 10px 10px;
  input,
  label {
    display: block;
  }
  input {
    width: 100%;
  }
  img {
    float: right;
  }
`;
const ImageArea = styled.div`
  // width: 200px;
  padding: 0 30px 10px 10px;
  float: right;
  img {
    float: right;
    border: 1px solid black;
  }
`;
const CreateButton = styled.div`
  clear: both;
  border: 1px solid grey;
  width: 150px;
  height: 25px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
`;
class EditProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      productName: '',
      productInfo: '',
      productPrice: '',
      imageUrl: '',
    };
  }
  closeModal = () => {
    this.props.resetProduct();
    this.props.toggleModalEdit();
    this.setState({
      id: '',
      productName: '',
      productInfo: '',
      productPrice: '',
      imageUrl: '',
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.product !== prevProps.product) {
      this.getProductData();
    }
  }

  getProductData = async () => {
    if (this.props.product !== '') {
      console.log('id recieved');
      let productId = this.props.product;
      let productRef = db
        .collection('pages')
        .doc('selections')
        .collection('products')
        .doc(productId);
      await productRef.get().then((doc) => {
        if (doc.exists) {
          //   console.log('Document data:', doc.data());
          //   const productData = {
          //     id: doc.id,
          //     name: doc.data().productName,
          //     info: doc.data().productInfo,
          //     price: doc.data().productPrice,
          //     imageUrl: doc.data().imageUrl,
          //   };
          this.setState({
            id: doc.id,
            productName: doc.data().productName,
            productInfo: doc.data().productInfo,
            productPrice: doc.data().productPrice,
            imageUrl: doc.data().imageUrl,
          });
          // console.log(this.state.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
    }
  };

  updateProduct = async () => {
    if (this.props.product !== '') {
      console.log('id recieved');
      let productId = this.props.product;
      let productRef = db
        .collection('pages')
        .doc('selections')
        .collection('products')
        .doc(productId);

      productRef.update({
        productName: this.state.productName,
        productPrice: this.state.productPrice,
      });
    }
    this.closeModal();
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, productName, productInfo, productPrice, imageUrl } = this.state;
    return (
      <div
        className='modal-wrapper'
        style={{ display: this.props.modalEditOpen ? 'block' : 'none' }}
      >
        <div className='modal-body'>
          <form onSubmit={this.updateCard}>
            <div>
              <span className='modal-close' onClick={this.closeModal}>
                &times;
              </span>
              <p className='label-title'>Rediger produkt</p>
              product id : {id}
              <hr />
            </div>
            <div className='edit-area'>
              <Content>
                <EditArea>
                  <label htmlFor='productName'>Produkt navn:</label>
                  <input
                    type='text'
                    name='productName'
                    id='name'
                    ref
                    onChange={this.handleChange}
                    defaultValue={productName}
                  />
                  <label htmlFor='price'>Produkt pris:</label>
                  <input
                    type='text'
                    name='productPrice'
                    id='price'
                    onChange={this.handleChange}
                    defaultValue={productPrice}
                  />
                </EditArea>
                <ImageArea>
                  {/* Image Preview */}

                  <img src={this.state.imageUrl} alt='image preview' />
                </ImageArea>
              </Content>
            </div>
            <div></div>
            <CreateButton onClick={this.updateProduct}>
              Gem ændringer
            </CreateButton>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProductModal;
