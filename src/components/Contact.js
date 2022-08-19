import React from 'react';
import styled from 'styled-components';
import { pagesRef } from '../firebase';
import ContactIcon from './../assets/gfx/candymix-contact-icon.svg';

const ContactContainer = styled.div`
  background: white;
  margin-top: -50px;
`;
const ContactLogo = styled.div`
  padding: 50px 0 25px 0;
  background: url(${ContactIcon});
  background-repeat: no-repeat;
  background-position: center 85%;
  width: 100px;
  height: 100px;
  margin: auto;
`;
const Headline = styled.div`
  margin: auto;
  text-align: center;
  width: 600px;
  text-transform: uppercase;
  color: #cc1433;
  font-size: 40px;
  font-family: 'Candal', sans-serif;
`;
const Teaser = styled.div`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  margin: auto;
  width: 650px;
`;
const ContactFormContainer = styled.div`
  margin: auto;
  width: 1050px;
  min-height: 500px;
  @media (max-width: 1300px) {
    width: 750px;
  }
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 450px 450px;
  justify-content: space-evenly;
  @media (max-width: 1300px) {
    grid-template-columns: 350px 350px;
  }
  input[type='text'],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #cc1433;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }
  input,
  label {
    display: block;
  }
  input:focus,
  select:focus {
    background: #fae8eb;
    outline: none;
  }
  input:hover {
    background: #fae8eb;
    outline: none;
  }
`;
const FullName = styled.div``;
const Email = styled.div``;
const Message = styled.div`
  display: grid;
  grid-template-columns: 950px;
  justify-content: space-evenly;

  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #cc1433;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    min-height: 150px;
    max-height: 600px;
    resize: vertical;
    :focus {
      background: #fae8eb;
      outline: none;
    }
    @media (max-width: 1300px) {
      width: 80%;
      margin: auto;
    }
  }

  label {
    display: block;
    @media (max-width: 1300px) {
      width: 80%;
      margin: auto;
    }
  }
  input[type='submit'] {
    background: #fae8eb;
    margin: auto;
    cursor: pointer;
    width: 50%;
    padding: 12px;
    border: 1px solid #cc1433;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    :focus {
      outline: none;
    }
  }
`;

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
    };
    this.getContactData();
  }

  getContactData = async () => {
    // Get texts for locations
    await pagesRef
      .doc('contact')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText: doc.data().teaserText,
          };
          this.setState({ contactData: data });
          console.log(this.state.contactData.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };
  handleSendEmail = (e) => {
    e.preventDefault();
    console.log('Send Email');
    alert('Email could not be sent at this time.');
  };

  render() {
    const { title, teaserText } = this.state.contactData;
    return (
      <React.Fragment>
        <ContactContainer>
          <ContactLogo></ContactLogo>
          <Headline>{title}</Headline>
          <Teaser>
            <p>{teaserText}</p>
          </Teaser>
          <ContactFormContainer>
            <form>
              <Info>
                <div>
                  <FullName>
                    <label htmlFor='fname'>Fulde navn:</label>
                    <input
                      type='text'
                      id='fname'
                      name='firstname'
                      placeholder='Dit fulde navn..'
                    />
                  </FullName>
                  <Email>
                    <label htmlFor='email'>E-mail:</label>
                    <input
                      type='text'
                      id='email'
                      name='email'
                      placeholder='Din E-mail..'
                    />
                  </Email>
                </div>
                <div>
                  <div>
                    <label htmlFor='phonenr'>Tlf. nr.:</label>
                    <input
                      type='text'
                      id='phonenr'
                      name='phonenr'
                      placeholder='Dit tlf. nummer..'
                    />
                  </div>
                  <div>
                    <label htmlFor='area'>Område/By:</label>
                    <input
                      type='text'
                      id='area'
                      name='area'
                      placeholder='Hvor bor du?'
                    />
                    {
                      //   <label for='country'>Område</label>
                      //   <select id='country' name='country'>
                      //   <option value='australia'>Australia</option>
                      //   <option value='canada'>Canada</option>
                      //   <option value='usa'>USA</option>
                      //   </select>
                    }
                  </div>
                </div>
              </Info>
              <Message>
                <label htmlFor='subject'>Skriv en besked</label>
                <textarea
                  id='subject'
                  name='subject'
                  placeholder='Write something..'
                  style={{ height: '200px' }}
                ></textarea>

                <input
                  type='submit'
                  value='Send besked'
                  onClick={this.handleSendEmail}
                />
              </Message>
            </form>
          </ContactFormContainer>
        </ContactContainer>
      </React.Fragment>
    );
  }
}

export default Contact;
