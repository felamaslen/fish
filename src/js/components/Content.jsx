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
import { LastDone } from './LastDone';

export class Content extends PureControllerView {
  render() {
    const activeTankKey = this.props.tanks.get('active');
    const activeTank = activeTankKey > -1 ?
      this.props.tanks.getIn(['list', activeTankKey]) : null;
    const tankId = activeTank ? activeTank.get('id') : null;

    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Tanks dispatcher={this.props.dispatcher}
                table='tanks' title='Fish tanks'
                items={this.props.tanks.get('list')}
                activeItem={this.props.tanks.get('active')}
                editing={this.props.tanks.get('editing')}
                props={this.props.tanks.get('props')} />
            </Row>
            <Row>
              <Water dispatcher={this.props.dispatcher}
                table='water' title='Water tests'
                items={this.props.water.get('list')}
                activeItem={this.props.water.get('active')}
                editing={this.props.water.get('editing')}
                props={this.props.water.get('props')}
                tankKey={this.props.tanks.get('active')} />
            </Row>
          </Col>
          <Col>
            <Row>
              <LastDone dispatcher={this.props.dispatcher}
                item='feed' tankId={tankId} title='Last feed'
                value={this.props.last.get('feed')} />
            </Row>
            <Row>
              <LastDone dispatcher={this.props.dispatcher}
                item='waterChange' tankId={tankId} title='Last water change'
                value={this.props.last.get('waterChange')} />
            </Row>
            <Row>
              <LastDone dispatcher={this.props.dispatcher}
                item='filterClean' tankId={tankId} title='Last filter clean'
                value={this.props.last.get('filterClean')} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

Content.propTypes = {
  tanks: PropTypes.instanceOf(map),
  water: PropTypes.instanceOf(map),
  last: PropTypes.instanceOf(map)
};

