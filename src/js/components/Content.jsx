/**
 * Content component
 */

import { Map as map } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import { Container, Row, Col } from 'reactstrap';
import { Tanks } from './Tanks';

export class Content extends PureControllerView {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Tanks dispatcher={this.props.dispatcher}
              tanks={this.props.tanks.get('list')}
              activeTank={this.props.tanks.get('active')} />
          </Col>
        </Row>
      </Container>
    );
  }
}

Content.propTypes = {
  tanks: PropTypes.instanceOf(map)
};

