import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { db, pagesRef } from '../firebase';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import NewLocationModal from './NewLocationModal';
import EditProductModal from './EditProductModal';

const Container = styled.div`
  h2 {
    padding: 20px 0 10px 10px;
  }
`;
const TopSpace = styled.div``;
const InputContainer = styled.div`
  width: 500px;
  padding: 0 10px 10px 10px;
  input,
  label {
    display: block;
  }
  input {
    width: 100%;
  }
`;
const LocationsContainer = styled.div`
  width: 500px;
  padding: 0 10px 10px 10px;
`;
const Product = styled.div`
  width: 500px;
  height: 40px;
  border: 1px solid green;
  display: flex;
  align-items: center;

  background: linear-gradient(to top, #bdbdbd, #ffffff);
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  box-shadow: 1px 1px 1px #bee2f9;
  font-size: 14px;
  margin: 2px 0 2px 0;
`;
const TitleText = styled.div`
  font-size: 16px;
  float: left;
  width: 100%;
  padding: 0 0 0 10px;
`;
const NewLocation = styled.a`
  font-size: 20px;
  color: green;
  float: right;
  width: 140px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  margin: 0 0 10px 0;
  padding: 0 0 5px 0;
`;
const LocationName = styled.div`
  font-size: 16px;
  float: left;
  width: 100%;
  padding: 0 0 0 10px;
`;
const EditIcon = styled.a`
  font-size: 28px;
  color: green;
  float: right;
  width: 50px;
  cursor: pointer;
`;
const DeleteIcon = styled.a`
  font-size: 28px;
  color: red;
  float: right;
  width: 50px;
  cursor: pointer;
`;

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      teaserText: '',
      locations: [],
      modalEditOpen: false,
      modalNewOpen: false,
      selectedLocation: '',
    };
    this.getData();
  }
  toggleModalNew = () => {
    this.setState({ modalNewOpen: !this.state.modalNewOpen });
  };
  toggleModalEdit = () => {
    this.setState({ modalEditOpen: !this.state.modalEditOpen });
  };
  selectLocation = (id, locationName) => (event) => {
    console.log(id, locationName);
    this.toggleModalEdit();
    this.setState({ selectedProduct: id });
  };
  resetProduct = () => {
    this.setState({ selectedProduct: '' });
  };
  deleteLocation = (locationId) => async (event) => {
    const willDelete = window.confirm(
      'Vil du slette produktet? (Kan ikke fortrydes)'
    );
    if (willDelete) {
      // this.setState({ selectedProduct: id });
      const res = await db
        .collection('pages')
        .doc('locations')
        .collection('vendingMachines')
        .doc(locationId)
        .delete();
    }
  };
  getData = async () => {
    await pagesRef
      .doc('locations')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText: doc.data().teaserText,
          };
          this.setState({
            title: data.title,
            teaserText: data.teaserText,
          });
          // console.log(this.state.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });

    await pagesRef
      .doc('locations')
      .collection('vendingMachines')
      .where('emptyField', '==', '')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const location = {
            id: change.doc.id,
            title: change.doc.data().locationTitle,
            street: change.doc.data().locationStreet,
            city: change.doc.data().locationCity,
            imageUrl: change.doc.data().imageUrl,
            coordinates: change.doc.data().locationCoordinates,
          };

          if (change.type === 'added') {
            // console.log('New city: ', change.doc.data());

            this.setState({ locations: [location, ...this.state.locations] });
          }
          if (change.type === 'modified') {
            // console.log('Modified city: ', change.doc.data());
            const index = this.state.locations.findIndex((item) => {
              return item.id === change.doc.id;
            });
            const locations = [...this.state.locations];

            locations[index] = location;

            this.setState({ locations: locations });
          }
          if (change.type === 'removed') {
            // console.log('Removed city: ', change.doc.data());
            this.setState({
              locations: [
                ...this.state.locations.filter((location) => {
                  return location.id !== change.doc.id;
                }),
              ],
            });
          }
        });
      });
  };
  handleUpdate = (e) => {
    try {
      // Update site info data
      const selectionsRef = db.collection('pages').doc('selections');
      const selectionsPayload = {
        title: this.state.title,
        teaserText: this.state.teaserText,
      };
      selectionsRef.update(selectionsPayload).then(function () {
        console.log('Document updated!');
      });
      alert('Dine data er blevet opdateret!');
    } catch (error) {
      console.log(error);
      alert('Der opstod en fejl under opdateringen af data.');
    }
  };
  handleTitleChange = (e) => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (value, drop, id, editor) => {
    // console.log(value, drop, id);
    /**
     * defaultValue er bare den første værdi og derefter ignoreres det.
     * value er altid værdien af indholdet - det er derfor du ikke kan redigere.
     * Du skal opdatere value i onChange (eller lign) så at value nu reflekterer ændringen.
     * det er samme om med <input value={name] onChange={e => setName(e.target.value) /> ...
     * https://stackblitz.com/edit/react-ts-jbpulr
     *
     * onChange(content, delta, source, editor) {
     *  const text = editor.getText(content);
     * this.setState ({ content: text });
     * console.log(text);
     * }
     */
    if (id === 1) {
      let text = this.state;
      text.teaserText = editor.getContents(value);
      /* ******************* */
      this.setState({
        teaserText: value,
      });
    }
  };
  render() {
    const { title, locations } = this.state;
    return (
      //prettier-ignore
      <div>
        <Tabs>
          <TabList>
            <Tab>Udvalg</Tab>
          </TabList>

          <TabPanel>
            <Container>
              <TopSpace></TopSpace>
              <h2>Udvalg</h2>
              <InputContainer>
                <label htmlFor="title">Overskrift</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  drop="lol"
                  defaultValue={title}
                  onChange={this.handleTitleChange}
                />
                <label htmlFor="title">Teaser Tekst</label>
                <ReactQuill
                  theme="snow"
                  name="teaserText1"
                  id="teaserText1"
                  drop="lol"
                  ref='editor'
                  value={this.state.teaserText}
                  onChange={(e, drop, id, editor) => this.handleChange(e, drop, 1, editor)}
                />
              </InputContainer>
              <button onClick={this.handleUpdate}>Opdater dine data</button>
              <LocationsContainer>
              <TitleText>[Work in Progress]</TitleText>
              <NewLocation 
                onClick={this.toggleModalNew}
                title="Ny lokation">&#65122; Ny Lokation</NewLocation>
                {
                  locations.map(location => (
                    <Product key={location.id}>
                      <LocationName>
                        {location.title}
                      </LocationName>  
                      <EditIcon 
                        title="Rediger produkt"
                        onClick={this.selectLocation(location.id, location.title)}
                      >&#x270E;</EditIcon>
                      <DeleteIcon onClick={this.deleteLocation(location.id)} title="Slet produkt">&times;</DeleteIcon>
                    </Product>
                  ))
                }
              </LocationsContainer>
            </Container>
          </TabPanel>
        </Tabs>
        <NewLocationModal 
        
          modalNewOpen={this.state.modalNewOpen}
          toggleModalNew={this.toggleModalNew}

        />
        <EditProductModal 
          modalEditOpen={this.state.modalEditOpen}
          toggleModalEdit={this.toggleModalEdit}
          product={this.state.selectedProduct}
          resetProduct={this.resetProduct}
        />
      </div>
    );
  }
}

export default Locations;
