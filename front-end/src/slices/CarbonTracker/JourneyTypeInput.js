import React, { useState, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { TextRow } from '../../components/Form/TextRow';
import { SelectRow } from '../../components/Form/SelectRow';
import { getMakeOpts } from './actions';

const BikeInput = () => (
    <TextRow name='distance' label='Distance: ' />
)

const opts = [
    {
        value: '2019',
        label: '2019'
    }
]

const CarInput = ({values, setShowMap}) => {
    const [yearOptions, setYearOptions] = useState(opts);
    const [makeOpts, setMakeOpts] = useState([]);

    const handleYearChange = useCallback(async (year) => {
        var opts = getMakeOpts(year);
        console.log(opts);
        setMakeOpts(opts);
    })
    console.log(makeOpts);

    return (
        <div>
            <SelectRow name='year' label='Year: ' options={yearOptions} onChange={handleYearChange} />
            <SelectRow name='make' label='Make: ' options={makeOpts} isDisabled={!values.year} />
            <SelectRow name='model' label='Model: ' isDisabled={!values.make} />
            <TextRow name='distance' label='Enter Distance:' />
            <Row>
                <Col lg={{span: 8, offset: 3}}>
                    or
                    <Row>
                        <Col lg={12}>
                            <Button onClick={() => setShowMap(true)}>Show Map</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export const JourneyTypeInput = ({type, ...props}) => {

    return (
        <div>
            {type === 'bike' &&
                <BikeInput />
            }
            {type === 'car' &&
                <CarInput {...props} />
            }
        </div>
    )
}