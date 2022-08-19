import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { db, infoRef, menuRef } from '../firebase';
import styled from 'styled-components';

const Container = styled.div`
  h2 {
    padding: 20px 0 10px 10px;
  }
`;
const TopSpace = styled.div``;
const InputContainer = styled.div`
  width: 500px;
  padding: 0 10px 0 10px;
  input,
  label {
    display: block;
  }
  input {
    width: 100%;
  }
`;
class SiteInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressCity: '',
      addressStreet: '',
      addressStreet2: '',
      addressPostnr: '',
      companyName: '',
      country: '',
      email: '',
      phonenr: '',
      menu1: '',
      menu2: '',
      menu3: '',
      menu4: '',
      menu5: '',
    };
    this.getData();
  }

  getData = async () => {
    // Get general info
    await infoRef
      .doc('information')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const info = {
            id: doc.id,
            ...doc.data(),
          };
          // console.log(info);

          this.setState({
            companyName: info.companyName,
            email: info.email,
            phonenr: info.phonenr,
            addressStreet: info.addressStreet,
            addressStreet2: info.addressStreet2,
            addressPostnr: info.addressPostnr,
            addressCity: info.addressCity,
            country: info.country,
          });
          // console.log(this.state.siteInfo);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
    // Get menu texts
    await menuRef
      .doc('menuTexts')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const menu = {
            id: doc.id,
            ...doc.data(),
          };
          this.setState({
            menu1: menu.menu1,
            menu2: menu.menu2,
            menu3: menu.menu3,
            menu4: menu.menu4,
            menu5: menu.menu5,
          });
          // console.log(this.state.siteInfo);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = (e) => {
    try {
      // Update site info data
      const companyRef = db.collection('general-info').doc('information');

      const siteInfoPayload = {
        addressCity: this.state.addressCity,
        addressStreet: this.state.addressStreet,
        addressStreet2: this.state.addressStreet2,
        addressPostnr: this.state.addressPostnr,
        companyName: this.state.companyName,
        country: this.state.country,
        email: this.state.email,
        phonenr: this.state.phonenr,
      };

      companyRef.update(siteInfoPayload).then(function () {
        console.log('Document updated!');
      });

      // Update menu data
      const menuTextRef = db.collection('menu').doc('menuTexts');

      const menuTextPayload = {
        menu1: this.state.menu1,
        menu2: this.state.menu2,
        menu3: this.state.menu3,
        menu4: this.state.menu4,
        menu5: this.state.menu5,
      };

      menuTextRef.update(menuTextPayload).then(function () {
        console.log('Document updated!');
      });
      alert('Dine data er blevet opdateret!');
    } catch (error) {
      console.log(error);
      alert('Der opstod en fejl under opdateringen af data.');
    }
  };

  render() {
    const {
      companyName,
      email,
      phonenr,
      addressCity,
      addressPostnr,
      addressStreet,
      addressStreet2,
      menu1,
      menu2,
      menu3,
      menu4,
      menu5,
    } = this.state;
    return (
      ////prettier-ignore
      <div>
        <Tabs>
          <TabList>
            <Tab>Website Info</Tab>
            <Tab>Adresse</Tab>
            <Tab>Menu</Tab>
          </TabList>

          <TabPanel>
            <Container>
              <TopSpace></TopSpace>
              <h2>Website Information</h2>
              <InputContainer>
                <label htmlFor="companyName">Virksomhedsnavn</label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue={companyName}
                  onChange={this.handleChange}
                />

                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={email}
                  onChange={this.handleChange}
                />

                <label htmlFor="phonenr">Tlf. nummer</label>
                <input
                  type="text"
                  name="phonenr"
                  defaultValue={phonenr}
                  onChange={this.handleChange}
                />
              </InputContainer>
            </Container>
          </TabPanel>
          <TabPanel>
            <Container>
              <TopSpace></TopSpace>
              <h2>Adresse</h2>
              <InputContainer>
                <label htmlFor="addressStreet">Adresse</label>
                <input
                  type="text"
                  name="addressStreet"
                  defaultValue={addressStreet}
                  onChange={this.handleChange}
                />

                <label htmlFor="addressStreet2">Adresse</label>
                <input
                  type="text"
                  name="addressStreet2"
                  defaultValue={addressStreet2}
                  onChange={this.handleChange}
                />
                <label htmlFor="addressCity">By</label>
                <input
                  type="text"
                  name="addressCity"
                  defaultValue={addressCity}
                  onChange={this.handleChange}
                />
                <label htmlFor="addressPostnr">Postnummer</label>
                <input
                  type="text"
                  name="addressPostnr"
                  defaultValue={addressPostnr}
                  onChange={this.handleChange}
                />
              </InputContainer>
            </Container>
          </TabPanel>
          <TabPanel>
            <Container>
              <TopSpace></TopSpace>
              <h2>Menupunkter</h2>
              <InputContainer>
                <label htmlFor="menu1">Menu pkt. 1</label>
                <input
                  type="text"
                  name="menu1"
                  defaultValue={menu1}
                  onChange={this.handleChange}
                />
                <label htmlFor="menu1">Menu pkt. 2</label>
                <input
                  type="text"
                  name="menu2"
                  defaultValue={menu2}
                  onChange={this.handleChange}
                />
                <label htmlFor="menu1">Menu pkt. 3</label>
                <input
                  type="text"
                  name="menu3"
                  defaultValue={menu3}
                  onChange={this.handleChange}
                />
                <label htmlFor="menu1">Menu pkt. 4</label>
                <input
                  type="text"
                  name="menu4"
                  defaultValue={menu4}
                  onChange={this.handleChange}
                />
                <label htmlFor="menu1">Menu pkt. 5</label>
                <input
                  type="text"
                  name="menu5"
                  defaultValue={menu5}
                  onChange={this.handleChange}
                />
              </InputContainer>
            </Container>
          </TabPanel>
        </Tabs>
        <button onClick={this.handleUpdate}>Opdater dine data</button>
      </div>
    );
  }
}
export default SiteInfo;
