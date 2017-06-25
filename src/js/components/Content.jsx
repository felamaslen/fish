/**
 * Content component
 */

import { Map as map } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import { Container, Row, Col } from 'reactstrap';
import { Tanks } from './Tanks';
import { Water } from './Water';

export class Content extends PureControllerView {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Tanks dispatcher={this.props.dispatcher}
              table='tanks' title='Fish tanks'
              items={this.props.tanks.get('list')}
              activeItem={this.props.tanks.get('active')}
              editing={this.props.tanks.get('editing')}
              props={this.props.tanks.get('props')} />
          </Col>
          <Col>
            <Water dispatcher={this.props.dispatcher}
              table='water' title='Water tests'
              items={this.props.water.get('list')}
              activeItem={this.props.water.get('active')}
              editing={this.props.water.get('editing')}
              props={this.props.water.get('props')}
              tankKey={this.props.tanks.get('active')} />
          </Col>
        </Row>
      </Container>
    );
  }
}

Content.propTypes = {
  tanks: PropTypes.instanceOf(map),
  water: PropTypes.instanceOf(map)
};

