import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { db, pagesRef } from '../firebase';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      teaserText1: '',
      teaserText2: '',
      buttonText: '',
    };
    this.getData();
  }

  getData = async () => {
    await pagesRef
      .doc('header')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText1: doc.data().teaserText1,
            teaserText2: doc.data().teaserText2,
            buttonText: doc.data().buttonText,
          };
          this.setState({
            title: data.title,
            teaserText1: data.teaserText1,
            teaserText2: data.teaserText2,
            buttonText: data.buttonText,
          });
          // console.log(this.state.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };

  handleUpdate = (e) => {
    try {
      // Update site info data
      const headerRef = db.collection('pages').doc('header');

      const headerPayload = {
        title: this.state.title,
        teaserText1: this.state.teaserText1,
        teaserText2: this.state.teaserText2,
        buttonText: this.state.buttonText,
      };

      headerRef.update(headerPayload).then(function () {
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
      text.teaserText1 = editor.getText(value);
      /* ******************* */
      this.setState({
        teaserText1: value,
      });
    } else if (id === 2) {
      let text = this.state;
      text.teaserText2 = editor.getText(value);
      /* ******************* */
      this.setState({
        teaserText2: value,
      });
    }
  };
  render() {
    const { title, buttonText } = this.state;
    return (
      //prettier-ignore
      <div>
        <Tabs>
          <TabList>
            <Tab>Om os</Tab>
          </TabList>

          <TabPanel>
            <Container>
              <TopSpace></TopSpace>
              <h2>Om os</h2>
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
                <label htmlFor="title">Teaser Tekst 1</label>
                <ReactQuill
                  theme="snow"
                  name="teaserText1"
                  id="teaserText1"
                  drop="lol"
                  ref='editor'
                  value={this.state.teaserText1}
                  onChange={(e, drop, id, editor) => this.handleChange(e, id, 1, editor)}
                />
                <label htmlFor="title">Teaser Tekst 2</label>
                <ReactQuill
                  theme="snow"
                  name="teaserText2"
                  id="teaserText2"
                  drop="lol"
                  ref='editor'
                  value={this.state.teaserText2}
                  onChange={(e, drop, id, editor) => this.handleChange(e, id, 2, editor)}
                />
                <label htmlFor="buttonText">Tekst på Knap</label>
                <input
                  type="text"
                  name="buttonText"
                  id="buttonText"
                  drop="lol"
                  defaultValue={buttonText}
                  onChange={this.handleTitleChange}
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
export default Header;
