import React from 'react';
import { Input, Button,Row,Col,Table } from 'reactstrap';

export default class Mytable extends React.Component {
    constructor(props){
        super(props);
        this.addNew = this.addNew.bind(this);
        this.add = this.add.bind(this);
        this.state = {
            local: this.props.TableData, // create local memory to store temp input
            //for add
            newPerson:
                {
                    name: "",
                    age: 0,
                    address:""
                }
        }
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    {this.renderTable()}
                </Col>
            </Row>
        );
    }

    renderTable(){
        return (
            <Table striped>
                <thead>
                    <tr>
                        {this.props.TableData.header.map(
                            attribute => {
                                return <th  key={attribute.name}>{attribute.name}</th>
                            })}
                    </tr>
                </thead>
                <tbody>
                    {this.addNew()}
                    {this.props.TableData.body.map(
                            person => {
                                return this.getRow(person)
                            })}
                </tbody>
            </Table>
        );
    }

    addNew(){
        return(
            <tr>
                {["name","age","address"].map(
                    attribute => {
                        return  <td>{(
                            <Input
                            id = {attribute}
                            placeholder= { "new "+attribute }
                            onChange = {event => this.setNew(attribute, event.target.value)}
                        />)
                        }</td>
                    })}
                <td>{this.addButton()}{this.cleanButton()}</td>
            </tr>
        );
    }

    setNew(attr, data){
        if(attr === "age"){
            let re = /^[0-9]+.?[0-9]*/;// age is int
            if (!re.test(data)) {
                alert("Age must be int!");
                document.getElementById("age").value = '';
            }
        }
        let copy = this.state.newPerson;
        copy[attr] = data;
        this.setState({"newPerson": copy});
    }

    getRow(person){
        let index  = this.props.TableData.body.indexOf(person);
        return(
            <tr>
                {["name","age","address"].map(
                    attribute => {
                       return  <td>{person.edit ? (<Input placeholder= {person[attribute]}
                                                          onChange = {event => this.tempChange(index,attribute, event.target.value)}
                       />) : person[attribute]
                       }</td>
                    })}
                <td>{this.saveButton(index)}{this.editButton(index)}{this.cancelButton(index)}</td>
            </tr>
        );
    }

    addButton(){
        return(
            <Button outline color="primary"
                    onClick = {event => this.add()}
            >Add</Button>
        );
    }

    cleanButton(){
        return(
            <Button outline color="danger"
                    onClick = {event => this.clean()}
            >Clean</Button>
        );
    }

    editButton(index){
        return(
            <Button outline color="primary"
                    onClick = {event => this.personDataChange(index, "edit", true)}
            >Edit</Button>
        );
    }

    cancelButton(index){
        return(
            <Button outline color="danger"
                    onClick = {event => this.personDataChange(index, "edit", false)}
            >Cancel</Button>
        );
    }

    saveButton(index){
        return(
            <Button outline color="success"
                    onClick = {event => this.submit(index)}
            >Save</Button>
        );
    }

    submit(index){
        this.props.setAppState("TableData", this.state.local);
        this.personDataChange(index, "edit", false);
    }

    add(){
        let copy = this.state.local;
        copy.body.push(this.state.newPerson);
        this.setState({'local': copy});
        this.props.setAppState("TableData", this.state.local);

    }

    clean(){
        document.getElementById("name").value = '';
        document.getElementById("age").value = '';
        document.getElementById("address").value = '';
        let ep = {
            name: "",
            age: 0,
            address: ""
        };
        this.setState({"newPerson": ep});
    }

    tempChange(index, attr, newValue){
        let copy = this.state.local;
        copy.body[index][attr] = newValue;
        this.setState({"local": copy});
    }

    personDataChange(index, attr, newValue){
        let copy = this.props.TableData;
        copy.body[index][attr] = newValue;
        this.props.setAppState("TableData", copy);
    }
}