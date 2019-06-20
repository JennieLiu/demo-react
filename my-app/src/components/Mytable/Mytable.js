import React from 'react';
import { Input, Button,Row,Col,Table } from 'reactstrap';

export default class Mytable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            <Table bordered>
                <thead>
                    <tr>
                        {this.props.TableData.header.map(
                            attribute => {
                                return <th  key={attribute.name}>{attribute.name}</th>
                            })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.TableData.body.map(
                            person => {
                                return this.getRow(person)
                            })}

                </tbody>
            </Table>
        );
    }


    getRow(person){
        return(
            <tr>
                {["name","age","address"].map(
                    attribute => {
                       return  <td>{!person.edit ? (<Input placeholder= {person[attribute]} />) : person[attribute]
                       }</td>
                    })}
                <td>{this.editButton()}</td>
            </tr>
        );
    }

    editButton(){
        return(
            <Button outline color="primary">Edit</Button>
        );
    }
}