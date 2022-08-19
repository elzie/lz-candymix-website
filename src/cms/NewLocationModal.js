import React from 'react';
import { db } from '../firebase';
import firebase from '../firebase';
import styled from 'styled-components';
import AvatarEditor from 'react-avatar-editor';
// import TextareaAutosize from 'react-autosize-textarea';
import ImageEditor from './imageEditor/ImageEditor';
import LocationPicker from './LocationPicker/LocationPicker';
const EditArea = styled.div`
  width: 250px;
  padding: 0 10px 10px 10px;
  float: left;
  input,
  label {
    display: block;
  }
  input=[text] {
    width: 100%;
  }
  input=[checkbox] {
    display: inline;
  }
`;
const ImageArea = styled.div`
  width: 530px;
  padding: 10px 0 0 0;
  float: right;
`;

const LocationPickerArea = styled.div`
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

class NewLocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      locationTitle: '',
      locationStreet: '',
      locationCity: '',
      locationCoordinates: [],
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
      addressBySelect: true,
    };
  }

  toggleCheckboxChange = () => {
    this.setState({
      addressBySelect: !this.state.addressBySelect,
    });
  };
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
      this.state.locationTitle.replace(/ /g, '_') +
      '-' +
      Math.floor(Math.random() * 1000);
    storageRef
      .child(`vendingMachines/${imageName}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ uploadedCroppedImage: downloadURL });
        });
      });
  };
  saveNewProduct = async () => {
    if (
      this.state.locationTitle !== '' &&
      this.state.locationStreet !== '' &&
      this.state.locationCity !== '' &&
      this.state.croppedImage !== ''
    ) {
      console.log('all good.. Saving image to storage');
      this.uploadCroppedImage();

      console.log('Saving product to database...');
      setTimeout(() => {
        try {
          const locationsRef = db
            .collection('pages')
            .doc('locations')
            .collection('vendingMachines');

          const locationsPayload = {
            locationTitle: this.state.locationTitle,
            emptyField: '', // IS needed, for 'where'
            locationStreet: this.state.locationStreet,
            locationCity: this.state.locationCity,
            locationCoordinates: this.state.locationCoordinates,
            imageUrl: this.state.uploadedCroppedImage,
          };
          locationsRef.add(locationsPayload).then(function () {
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
        locationTitle: '',
        locationStreet: '',
        locationCity: '',
        locationCoordinates: '',
        imageUrl: '',
        previewImage: '',
        croppedImage: '',
      });
      // this.titleInput.current.value = '';
      // this.streetInput.current.value = '';
      // this.cityInput.current.value = '';
      // this.coordinatesInput.current.value = '';
      this.fileInput.current.value = '';
    }, 1000);
  };

  titleInput = React.createRef();
  streetInput = React.createRef();
  cityInput = React.createRef();
  coordinatesInput = React.createRef();
  fileInput = React.createRef();
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getCoordinates = (lat, lng) => {
    // console.log(lat, lng);
    this.setCoordinates(lat, lng);
  };
  setCoordinates = (lat, lng) => {
    const locationCoordinates = {
      df: lat,
      wf: lng,
    };
    this.setState({ locationCoordinates: locationCoordinates });
    console.log(locationCoordinates);
  };
  getAddressFromCoords = (addressObject) => {
    console.log(addressObject);
    if (addressObject) {
      this.setState({
        locationStreet: addressObject.street,
        locationCity: addressObject.city,
      });
    }
  };
  render() {
    const {
      id,
      locationTitle,
      locationStreet,
      locationCity,
      locationCoordinates,
      imageUrl,
      previewImage,
    } = this.state;
    return (
      <div
        className="modal-wrapper"
        style={{ display: this.props.modalNewOpen ? 'block' : 'none' }}
      >
        <div className="modal-body">
          <form onSubmit={this.updateCard}>
            <div>
              <span className="modal-close" onClick={this.closeModal}>
                &times;
              </span>
              <p className="label-title">Ny Lokation</p>

              <hr />
            </div>
            <div className="edit-area">
              <EditArea>
                <label htmlFor="locationTitle">Lokations titel:</label>
                <input
                  type="text"
                  name="locationTitle"
                  ref={this.titleInput}
                  onChange={this.handleChange}
                  defaultValue={locationTitle}
                />
                <label htmlFor="locationStreet">Adresse:</label>
                <input
                  type="text"
                  name="locationStreet"
                  ref={this.streetInput}
                  onChange={this.handleChange}
                  defaultValue={locationStreet}
                />
                <label htmlFor="locationCity">Postnummer & By</label>
                <input
                  type="text"
                  name="locationCity"
                  ref={this.cityInput}
                  onChange={this.handleChange}
                  defaultValue={locationCity}
                />
                <input
                  style={{ display: 'inline' }}
                  type="checkbox"
                  defaultChecked={this.state.addressBySelect}
                  onChange={this.toggleCheckboxChange}
                />{' '}
                Sæt adresse ved klik på kort
                <br />
                <br />
                <label htmlFor="locationCoordinates">Koordinater</label>
                Lat: {locationCoordinates.df} <br />
                Lng: {locationCoordinates.wf}
                <br />
                <br />
                <label htmlFor="previewImage">Produkt billede:</label>
                <input
                  onChange={this.handleImageChange}
                  type="file"
                  ref={this.fileInput}
                  label="Preview Image"
                  name="previewImage"
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
              <LocationPickerArea></LocationPickerArea>
              <LocationPicker
                modalNewOpen={this.props.modalNewOpen}
                getAddressFromCoords={this.getAddressFromCoords}
                addressBySelect={this.state.addressBySelect}
                getCoordinates={this.getCoordinates}
              />
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

export default NewLocationModal;
