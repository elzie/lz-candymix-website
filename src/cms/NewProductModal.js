import React from 'react';
import { db } from '../firebase';
import firebase from '../firebase';
import styled from 'styled-components';
import AvatarEditor from 'react-avatar-editor';
// import TextareaAutosize from 'react-autosize-textarea';
import ImageEditor from './imageEditor/ImageEditor';

const EditArea = styled.div`
  width: 250px;
  padding: 0 10px 10px 10px;
  float: left;
  input,
  label {
    display: block;
  }
  input {
    width: 100%;
  }
`;
const ImageArea = styled.div`
  // width: 200px;
  padding: 0 30px 10px 10px;
  float: right;
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

class NewProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      productName: '',
      productInfo: '',
      productPrice: '',
      imageUrl: '',
      previewImage: '',
      croppedImage: '',
      blob: '',
      uploadedCroppedImage: '',
      storageRef: firebase.storage().ref(),
      userRef: firebase.auth().currentUser,
      // usersRef: firebase.firestore().ref('users'),
      metadata: {
        contentType: 'image/jpeg',
      },
    };
  }
  handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };
  setCroppedImage = (imageUrl, theBlob) => {
    if (imageUrl && theBlob) {
      this.setState({
        croppedImage: imageUrl,
        blob: theBlob,
      });
      console.log('url', imageUrl);
      console.log('blob', theBlob);
      // 1- uploadCroppedImage
      // 2- handleCropImage
    }
  };

  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;
    const imageName =
      'Image-' +
      this.state.productName.replace(/ /g, '_') +
      '-' +
      Math.floor(Math.random() * 1000);
    storageRef
      .child(`candyProducts/${imageName}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ uploadedCroppedImage: downloadURL });
        });
      });
  };
  saveNewProduct = async () => {
    if (
      this.state.productName !== '' &&
      this.state.productPrice !== '' &&
      this.state.croppedImage !== ''
    ) {
      console.log('all good.. Saving image to storage');
      this.uploadCroppedImage();

      console.log('Saving product to database...');
      setTimeout(() => {
        try {
          const productsRef = db
            .collection('pages')
            .doc('selections')
            .collection('products');

          const productPayload = {
            productName: this.state.productName,
            productInfo: '',
            productPrice: this.state.productPrice,
            imageUrl: this.state.uploadedCroppedImage,
          };
          productsRef.add(productPayload).then(function () {
            console.log('Document updated!');
          });
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    } else {
      console.log('not all good');
    }
    this.closeModal();
  };
  closeModal = () => {
    this.props.toggleModalNew();
    setTimeout(() => {
      this.setState({
        id: '',
        productName: '',
        productInfo: '',
        productPrice: '',
        imageUrl: '',
        previewImage: '',
        croppedImage: '',
      });
      this.nameInput.current.value = '';
      this.priceInput.current.value = '';
      this.fileInput.current.value = '';
    }, 1000);
  };
  nameInput = React.createRef();
  priceInput = React.createRef();
  fileInput = React.createRef();
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      id,
      productName,
      productInfo,
      productPrice,
      imageUrl,
      previewImage,
    } = this.state;
    return (
      <div
        className='modal-wrapper'
        style={{ display: this.props.modalNewOpen ? 'block' : 'none' }}
      >
        <div className='modal-body'>
          <form onSubmit={this.updateCard}>
            <div>
              <span className='modal-close' onClick={this.closeModal}>
                &times;
              </span>
              <p className='label-title'>Nyt produkt</p>

              <hr />
            </div>
            <div className='edit-area'>
              <EditArea>
                <label htmlFor='productName'>Produkt navn:</label>
                <input
                  type='text'
                  name='productName'
                  ref={this.nameInput}
                  onChange={this.handleChange}
                  defaultValue={productName}
                />
                <label htmlFor='productPrice'>Produkt pris:</label>
                <input
                  type='text'
                  name='productPrice'
                  ref={this.priceInput}
                  onChange={this.handleChange}
                  defaultValue={productPrice}
                />
                <label htmlFor='previewImage'>Produkt billede:</label>
                <input
                  onChange={this.handleImageChange}
                  type='file'
                  ref={this.fileInput}
                  label='Preview Image'
                  name='previewImage'
                />
              </EditArea>
              <ImageArea>
                {/* Image Preview */}
                {
                  //   previewImage && (
                  //   <AvatarEditor
                  //     ref={(node) => (this.AvatarEditor = node)}
                  //     image={previewImage}
                  //     width={200}
                  //     height={200}
                  //     border={5}
                  //     scale={1.0}
                  //   />
                  // )
                }
                {previewImage && (
                  <ImageEditor
                    setCroppedImage={this.setCroppedImage}
                    image={previewImage}
                  />
                )}
              </ImageArea>
            </div>
            <div></div>
            <CreateButton onClick={this.saveNewProduct}>
              Opret nyt produkt
            </CreateButton>
          </form>
        </div>
      </div>
    );
  }
}

export default NewProductModal;
